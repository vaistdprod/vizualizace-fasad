'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const rowNumberString = data.rowNumber !== undefined ? `${data.rowNumber + 1}` : ''
  const label = data?.data?.link?.label
    ? `Nav item ${rowNumberString}: ${data?.data?.link?.label}`
    : 'Row'

  return <div>{label}</div>
}
