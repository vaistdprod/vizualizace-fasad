'use client'
import React from 'react'
import { formatDate, formatDateInput } from '../../app/(payload)/custom-date-formatter'

// This component will override the default date formatter in Payload CMS
export const CustomDateFormatter: React.FC<{ date: string; isInput?: boolean }> = ({
  date,
  isInput,
}) => {
  if (!date) return null

  if (isInput) {
    return <span>{formatDateInput(date)}</span>
  }

  return <span>{formatDate(date)}</span>
}

export default CustomDateFormatter
