import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { getClientSideURL } from '@/utilities/getURL'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client } from '@aws-sdk/client-s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'

function throwError(varName: string): never {
  throw new Error(`Environment variable ${varName} is missing.`)
}

export async function POST(req: Request) {
  console.log('Route hit with headers:', Object.fromEntries(req.headers))

  // Apply rate limiting
  const rateLimitResult = rateLimit(req as any) // Cast to any to match PayloadRequest type
  if (rateLimitResult.limited) {
    return NextResponse.json(
      { error: rateLimitResult.message || 'Too many requests' },
      { status: 429 },
    )
  }

  try {
    const payload = await getPayload({ config: (await import('@/payload.config')).default })
    console.log('Payload initialized')

    console.log('Parsing request...')
    const formData = await req.formData()
    console.log('FormData entries:', Array.from(formData.entries()))

    const fields: Record<string, string> = {}
    const files: File[] = []

    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        fields[key] = value
      } else if (value instanceof File) {
        if (key === 'attachment') {
          files.push(value)
        }
      }
    }
    console.log('Parsed fields:', fields)
    console.log(
      'Parsed files:',
      files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
    )

    const formId = fields.form
    if (!formId) {
      return NextResponse.json({ error: 'Form ID missing' }, { status: 400 })
    }

    const numericFormId = Number(formId)
    console.log('Form ID:', numericFormId)

    const allowedMimetypes = ['image/png', 'image/heic', 'image/jpeg', 'image/webp']
    for (const file of files) {
      if (!allowedMimetypes.includes(file.type)) {
        throw new Error(`Unsupported file type: ${file.type}`)
      }
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file: File) => {
        const fileBuffer = Buffer.from(await file.arrayBuffer())
        const safeFilename = file.name?.replace(/[^a-zA-Z0-9.-]/g, '_') || `upload-${Date.now()}`
        const mediaDoc = await payload.create({
          collection: 'private_media',
          data: { alt: `Contact form upload - ${safeFilename}` },
          file: {
            name: safeFilename,
            data: fileBuffer,
            mimetype: file.type || 'application/octet-stream',
            size: file.size,
          },
        })
        console.log('Media created full doc:', JSON.stringify(mediaDoc, null, 2))
        return mediaDoc.id
      }),
    )

    const formDoc = await payload
      .findByID({
        collection: 'forms',
        id: numericFormId,
      })
      .catch((err) => {
        console.error('Form lookup error:', err)
        return null
      })
    if (!formDoc) {
      return NextResponse.json(
        { error: `Form with ID ${numericFormId} not found` },
        { status: 400 },
      )
    }
    console.log('Form doc found:', formDoc)

    const submissionData = Object.entries(fields)
      .filter(([key]) => key !== 'form')
      .map(([field, value]) => ({ field, value }))
    console.log('Submission data prepared:', {
      form: numericFormId,
      submissionData,
      attachments: uploadedFiles,
    })

    console.log('Attempting to create submission...')
    const submission = await payload
      .create({
        collection: 'custom_form_submissions',
        data: {
          form: numericFormId,
          submissionData,
          attachments: uploadedFiles,
          accessToken: crypto.randomUUID(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        },
        overrideAccess: true,
        context: { skipTransaction: false },
      })
      .catch((error) => {
        console.error('Create operation failed:', error)
        throw error
      })
    console.log('Submission created:', submission)

    try {
      const fetchedSubmission = await payload.findByID({
        collection: 'custom_form_submissions',
        id: submission.id,
        overrideAccess: true,
      })
      console.log('Fetched submission after creation:', fetchedSubmission)
    } catch (fetchError) {
      console.error('Fetch after creation failed:', fetchError)
    }

    await handleFormSubmission(
      {
        submissionData,
        attachments: uploadedFiles,
        submissionId: submission.id.toString(),
      },
      payload,
    )

    return NextResponse.json({ success: true, id: submission.id }, { status: 200 })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 },
    )
  }
}

async function handleFormSubmission(
  {
    submissionData,
    attachments,
    submissionId,
  }: {
    submissionData: { field: string; value: string }[]
    attachments?: number[]
    submissionId: string
  },
  payload: any,
) {
  const email = submissionData.find((d) => d.field === 'email')?.value || 'Není uveden'
  const name = submissionData.find((d) => d.field === 'name')?.value || 'Není uvedeno'
  const phone = submissionData.find((d) => d.field === 'phone')?.value || 'Není uveden'
  const message = submissionData.find((d) => d.field === 'message')?.value || 'Není uvedena'

  const submission = await payload.findByID({
    collection: 'custom_form_submissions',
    id: submissionId,
  })
  console.log('Submission attachments:', submission.attachments)

  // Initialize S3 client with R2 credentials
  const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID ?? throwError('R2_ACCESS_KEY_ID'),
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? throwError('R2_SECRET_ACCESS_KEY'),
    },
  })

  // Generate signed URLs for attachments
  const fileLinks = submission.attachments?.length
    ? `<p><strong>Přílohy:</strong><br>` +
      (
        await Promise.all(
          submission.attachments.map(async (attachment: { id: number }) => {
            const mediaDoc = await payload.findByID({
              collection: 'private_media',
              id: attachment.id,
            })
            if (!mediaDoc || !mediaDoc.filename) {
              console.warn(`Media not found for attachment ID: ${attachment.id}`)
              return `<span>Chybějící soubor ${attachment.id}</span>`
            }
            const command = new GetObjectCommand({
              Bucket: process.env.R2_PRIVATE_BUCKET ?? throwError('R2_PRIVATE_BUCKET'),
              Key: mediaDoc.filename,
            })
            const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }) // 1-hour expiration
            console.log(`Generated signed URL for ${mediaDoc.filename}: ${signedUrl}`)
            return `<a href="${signedUrl}">Soubor ${attachment.id}</a>`
          }),
        )
      ).join('<br>') +
      `</p>`
    : ''

  console.log(
    'Sending admin email to:',
    process.env.DEFAULT_TO_ADDRESS || 'info@vizualizacefasad.cz',
  )
  try {
    await payload.sendEmail({
      to: process.env.DEFAULT_TO_ADDRESS || 'vais@tdprod.cz',
      from: process.env.DEFAULT_FROM_ADDRESS || 'vais@tdprod.cz',
      subject: 'Nová zpráva z kontaktního formuláře',
      html: `
          <h1>Nová zpráva</h1>
          <p><strong>Jméno:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Zpráva:</strong> ${message}</p>
          ${fileLinks}
        `,
    })
    console.log('Admin email sent successfully')
  } catch (error) {
    console.error('Admin email failed:', error)
  }

  console.log('Sending user email to:', email)
  try {
    await payload.sendEmail({
      to: email,
      from: process.env.DEFAULT_FROM_ADDRESS || 'vais@tdprod.cz',
      subject: 'Děkujeme za vaši zprávu',
      html: `
          <h1>Dobrý den, ${name}!</h1>
          <p>Vaše zpráva byla odeslána. Brzy se ozveme.</p>
          <p><strong>Vaše zpráva:</strong> ${message}</p>
        `,
    })
    console.log('User email sent successfully')
  } catch (error) {
    console.error('User email failed:', error)
  }

  return { success: true }
}

// Import rateLimit function from payload.config.ts
import { rateLimit } from '@/payload.config'
