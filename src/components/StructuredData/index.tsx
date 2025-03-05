'use client'

import { generateMedicalPracticeSchema, generateArticleSchema } from '@/utilities/structuredData'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

interface StructuredDataProps {
  article?: any
}

export const StructuredData: React.FC<StructuredDataProps> = ({ article }) => {
  const pathname = usePathname()
  const isAktualityPage = pathname?.startsWith('/aktuality/') && pathname !== '/aktuality/'

  // Generate the appropriate schema based on the page type
  const schema =
    isAktualityPage && article ? generateArticleSchema(article) : generateMedicalPracticeSchema()

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}
