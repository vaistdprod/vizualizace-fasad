export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

type GTMEvent = {
  event: string
  'gtm.start'?: number
  [key: string]: unknown
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export const initGTM = () => {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []

  const initEvent: GTMEvent = {
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  }

  window.dataLayer.push(initEvent)
}

export const pushEvent = (event: string, data: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return

  window.dataLayer.push({
    event,
    ...data,
  })
}
