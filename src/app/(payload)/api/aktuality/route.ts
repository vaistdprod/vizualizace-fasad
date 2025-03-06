import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ids =
    searchParams
      .get('ids')
      ?.split(',')
      .map((id) => Number(id.trim()))
      .filter((id) => !isNaN(id)) || []

  if (!ids.length) {
    return NextResponse.json({ error: 'Nebyly poskytnuty žádné ID článků' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const aktualityResult = await payload.find({
      collection: 'aktuality',
      where: {
        id: {
          in: ids,
        },
      },
      depth: 3,
    })

    const validAktuality = aktualityResult.docs

    if (!validAktuality.length) {
      return NextResponse.json({ error: 'Nebyly nalezeny žádné platné články' }, { status: 404 })
    }

    const response = NextResponse.json(validAktuality)
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=43200, stale-while-revalidate=43200', // 12 hours cache, 12 hours stale-while-revalidate
    )
    return response
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    } else {
      errorMessage = 'Došlo k neznámé chybě'
    }
    return NextResponse.json(
      { error: 'Interní chyba serveru', details: errorMessage },
      { status: 500 },
    )
  }
}
