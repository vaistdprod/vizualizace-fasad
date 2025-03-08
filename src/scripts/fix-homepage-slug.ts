import configPromise from '../payload.config'
import { getPayload } from 'payload'

/**
 * This script fixes the homepage slug issue by ensuring the homepage has a slug of 'home'.
 * It identifies the homepage by looking for pages with titles that suggest they are the homepage,
 * or by looking for pages that have no slug or a slug that matches common homepage patterns.
 */
async function fixHomepageSlug() {
  try {
    console.log('Starting homepage slug fix script...')

    // Initialize Payload
    const payload = await getPayload({ config: configPromise })

    // Find all pages
    const pages = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 1000,
    })

    console.log(`Found ${pages.docs.length} pages`)

    // Find potential homepage candidates
    const homepageCandidates = pages.docs.filter((page) => {
      const title = page.title?.toLowerCase() || ''
      const slug = page.slug?.toLowerCase() || ''

      return (
        // Check for common homepage title patterns
        title.includes('domů') ||
        title.includes('hlavní stránka') ||
        title.includes('úvodní stránka') ||
        title.includes('home') ||
        title.includes('dětská ambulance') ||
        // Check for common homepage slug patterns
        slug === '' ||
        slug === 'index' ||
        slug === 'home' ||
        slug === 'homepage' ||
        slug === 'hlavni-stranka' ||
        slug === 'uvodni-stranka'
      )
    })

    console.log(`Found ${homepageCandidates.length} potential homepage candidates`)

    if (homepageCandidates.length === 0) {
      console.log('No homepage candidates found. Nothing to fix.')
      return
    }

    // Sort candidates by likelihood (prefer those that already have 'home' slug)
    homepageCandidates.sort((a, b) => {
      if (a.slug === 'home') return -1
      if (b.slug === 'home') return 1
      return 0
    })

    // Take the most likely candidate
    const homepage = homepageCandidates[0]

    if (!homepage) {
      console.log('No valid homepage found. Nothing to fix.')
      return
    }

    console.log(
      `Selected homepage candidate: "${homepage.title}" with slug "${homepage.slug || ''}"`,
    )

    // If the slug is already 'home', no need to update
    if (homepage.slug === 'home') {
      console.log('Homepage already has the correct slug "home". Nothing to fix.')
      return
    }

    // Update the homepage slug to 'home'
    console.log(`Updating homepage slug from "${homepage.slug || ''}" to "home"...`)

    await payload.update({
      collection: 'pages',
      id: String(homepage.id),
      data: {
        slug: 'home',
      },
    })

    console.log('Homepage slug successfully updated to "home"')
  } catch (error) {
    console.error('Error fixing homepage slug:', error)
  } finally {
    process.exit(0)
  }
}

fixHomepageSlug()
