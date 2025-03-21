// src/Footer/RowLabel.tsx
'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useLocale, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['footerColumns']>[number]>()
  const { code: locale } = useLocale()

  const labelText =
    data?.data?.title || data?.data?.links?.[0]?.label
      ? locale === 'cs'
        ? `Sloupec patičky ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${
            data.data.title || data.data.links?.[0]?.label
          }`
        : `Footer column ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${
            data.data.title || data.data.links?.[0]?.label
          }`
      : locale === 'cs'
        ? 'Řádek'
        : 'Row'

  return <div>{labelText}</div>
}
