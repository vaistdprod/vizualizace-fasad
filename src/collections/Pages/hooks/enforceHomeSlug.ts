import type { FieldHook } from 'payload'

// This hook ensures that the homepage (identified by title or existing slug)
// always has a slug of 'uvod' and cannot be changed
export const enforceHomeSlug: FieldHook = ({ value, data, originalDoc }) => {
  // Check if this is the homepage by looking at the original slug or title
  const isHomePage =
    originalDoc?.slug === 'uvod' ||
    data?.slug === 'uvod' ||
    data?.title?.toLowerCase().includes('domů') ||
    data?.title?.toLowerCase().includes('hlavní stránka') ||
    data?.title?.toLowerCase().includes('úvodní stránka') ||
    data?.title?.toLowerCase().includes('home') ||
    originalDoc?.title?.toLowerCase().includes('domů') ||
    originalDoc?.title?.toLowerCase().includes('hlavní stránka') ||
    originalDoc?.title?.toLowerCase().includes('úvodní stránka') ||
    originalDoc?.title?.toLowerCase().includes('home')

  // If this is the homepage, always return 'uvod' as the slug
  if (isHomePage) {
    return 'uvod'
  }

  // Otherwise, return the original value
  return value
}
