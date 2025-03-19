import canUseDOM from './canUseDOM'

export const getServerSideURL = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }

  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'https://studiofasad.cz'
  }

  return url
}

export const getClientSideURL = (): string => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || getServerSideURL() // Fallback to server-side URL
}
