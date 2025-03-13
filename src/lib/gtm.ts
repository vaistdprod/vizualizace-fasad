// src/lib/gtm.ts
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

type GTMEvent = {
  event: string
  'gtm.start'?: number
  [key: string]: unknown
}

type ConsentSettings = {
  analytics_storage: 'granted' | 'denied'
  ad_storage: 'granted' | 'denied'
  ad_user_data: 'granted' | 'denied'
  ad_personalization: 'granted' | 'denied'
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export const initGTM = (consent: ConsentSettings) => {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || [] // Ensure dataLayer is initialized

  // Set Consent Mode v2 defaults before GTM loads
  window.dataLayer.push({
    event: 'consent_default',
    ...consent,
  })

  // Load GTM
  const initEvent: GTMEvent = {
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  }
  window.dataLayer.push(initEvent)
}

export const updateGTMConsent = (consent: ConsentSettings) => {
  if (typeof window === 'undefined') return

  // Initialize dataLayer if it doesn't exist (e.g., if script hasn't loaded yet)
  window.dataLayer = window.dataLayer || []

  window.dataLayer.push({
    event: 'consent_update',
    ...consent,
  })
}

export const pushEvent = (event: string, data: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...data,
  })
}
