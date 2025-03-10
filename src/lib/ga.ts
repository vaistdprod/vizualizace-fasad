export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXX' // Replace with your GA4 Measurement ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: Record<string, any>[]
  }
}

// Optional: For client-side event tracking in components
export const pushEvent = (event: string, data: Record<string, any> = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', event, data)
}
