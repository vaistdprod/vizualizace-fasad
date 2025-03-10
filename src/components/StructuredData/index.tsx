'use client'

import { generateOrganizationSchema, generatePageSchema } from '@/utilities/structuredData'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

import type { Page } from '@/payload-types'

interface StructuredDataProps {
  page?: Pick<Page, 'title' | 'publishedAt' | 'meta'>
}

export const StructuredData: React.FC<StructuredDataProps> = ({ page }) => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // Generate the appropriate schema based on the page type
  const schema = page ? generatePageSchema(page) : generateOrganizationSchema()

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}
