// src/Header/RowLabel.tsx
'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useLocale, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()
  const { code: locale } = useLocale()

  const labelText = data?.data?.link?.label
    ? locale === 'cs'
      ? `Navigační položka ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.link.label}`
      : `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.link.label}`
    : locale === 'cs'
      ? 'Řádek'
      : 'Row'

  return <div>{labelText}</div>
}
