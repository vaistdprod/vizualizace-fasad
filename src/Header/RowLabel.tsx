'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const rowNumberString = data.rowNumber !== undefined ? `${data.rowNumber + 1}` : ''
  const label = data?.data?.link?.label
    ? `Položka navigace ${rowNumberString}: ${data?.data?.link?.label}`
    : `Položka navigace ${rowNumberString}`

  return <div>{label}</div>
}
