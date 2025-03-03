import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Aktuality } from '@/payload-types'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ids =
    searchParams
      .get('ids')
      ?.split(',')
      .map((id) => Number(id.trim())) || []

  if (!ids.length) {
    return NextResponse.json({ error: 'No aktualita IDs provided' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const fullAktuality = await Promise.all(
      ids.map(async (aktualitaId) => {
        if (isNaN(aktualitaId)) {
          return null
        }
        try {
          const aktualita = await payload.findByID({
            collection: 'aktuality',
            id: aktualitaId.toString(),
            depth: 3, // Ensure full Aktuality object with heroImage.url and publishedAt
          })
          return aktualita as Aktuality
        } catch (error) {
          return null
        }
      }),
    )

    // Filter out null or undefined aktuality and log for debugging
    const validAktuality = fullAktuality.filter(
      (aktualita): aktualita is Aktuality => aktualita !== null && aktualita !== undefined,
    )

    if (!validAktuality.length) {
      return NextResponse.json({ error: 'No valid aktuality found' }, { status: 404 })
    }

    return NextResponse.json(validAktuality)
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    } else {
      errorMessage = 'Unknown error occurred'
    }
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 },
    )
  }
}
