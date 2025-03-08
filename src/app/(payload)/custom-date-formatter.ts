// Custom date formatter for Payload CMS admin UI
// This will format dates in Czech format: DD. MMMM YYYY, HH:MM

export const formatDate = (date: string | number | Date): string => {
  const dateObj = new Date(date)

  // Czech month names
  const months = [
    'ledna',
    'února',
    'března',
    'dubna',
    'května',
    'června',
    'července',
    'srpna',
    'září',
    'října',
    'listopadu',
    'prosince',
  ]

  // Short month names for input format
  const shortMonths = [
    'led',
    'úno',
    'bře',
    'dub',
    'kvě',
    'čvn',
    'čvc',
    'srp',
    'zář',
    'říj',
    'lis',
    'pro',
  ]

  const day = dateObj.getDate()
  const month = months[dateObj.getMonth()]
  const shortMonth = shortMonths[dateObj.getMonth()]
  const year = dateObj.getFullYear()

  // Format hours and minutes with leading zeros
  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')

  // Czech date format: DD. MMMM YYYY, HH:MM
  return `${day}. ${month} ${year}, ${hours}:${minutes}`
}

// Format for date inputs (DD.MM.YYYY)
export const formatDateInput = (date: string | number | Date): string => {
  const dateObj = new Date(date)
  const day = String(dateObj.getDate()).padStart(2, '0')
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const year = dateObj.getFullYear()

  return `${day}.${month}.${year}`
}
