import canUseDOM from './canUseDOM'

export const getServerSideURL = (): string => {
  // Use localhost in development mode
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }

  // Check for NEXT_PUBLIC_SERVER_URL first
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  // Fall back to Vercel production URL if available
  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  // Default to production URL if nothing else is set
  if (!url) {
    url = 'https://studiofasad.cz'
  }

  console.log('Server-side URL:', url) // Debug log
  return url
}

export const getClientSideURL = (): string => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  // Fall back to Vercel production URL if available on server side
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  // Use server-side URL as fallback
  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
