import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    // Log for debugging
    console.log('formatSlugHook - operation:', operation, 'value:', value, 'data:', data)

    // If value is explicitly an empty string or a non-empty string, use it
    if (typeof value === 'string') {
      return formatSlug(value) // Returns '' if value is '', preserving empty slug
    }

    // Only generate a slug on create if no slug is provided
    if (operation === 'create' && !data?.slug) {
      const fallbackData = data?.[fallback]
      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value // Fallback to undefined or existing value if not creating
  }
