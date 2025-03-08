'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['footerColumns']>[number]>()

  const rowNumberString = data.rowNumber !== undefined ? `${data.rowNumber + 1}` : ''
  const label = data?.data?.title
    ? `Sloupec patičky ${rowNumberString}: ${data?.data?.title}`
    : `Sloupec patičky ${rowNumberString}`

  return <div>{label}</div>
}
