export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXX' // Replace with your GA4 Measurement ID

type GtagArgs = [
  type: 'event' | 'config' | 'set' | 'js',
  action: string,
  params?: Record<string, unknown>,
]

declare global {
  interface Window {
    gtag: (...args: GtagArgs) => void
    dataLayer: Record<string, unknown>[]
  }
}

// Optional: For client-side event tracking in components
export const pushEvent = (event: string, data: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', event, data)
}
