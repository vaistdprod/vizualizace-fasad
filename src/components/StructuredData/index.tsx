'use client'

import { generateMedicalPracticeSchema } from '@/utilities/structuredData'
import Script from 'next/script'

export const StructuredData: React.FC = () => {
  const medicalPracticeSchema = generateMedicalPracticeSchema()

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalPracticeSchema) }}
      strategy="afterInteractive"
    />
  )
}
