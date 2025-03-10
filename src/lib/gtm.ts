export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

declare global {
  interface Window {
    dataLayer: Record<string, any>[]
  }
}

export const initGTM = () => {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []

  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  })
}

export const pushEvent = (event: string, data: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return

  window.dataLayer.push({
    event,
    ...data,
  })
}
