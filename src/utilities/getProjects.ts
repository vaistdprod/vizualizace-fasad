// src/utilities/getProjects.ts
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

async function getProjects(depth = 1, featuredOnly = false) {
  const payload = await getPayload({ config: configPromise })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    depth,
    sort: '-createdAt', // Latest first
    limit: featuredOnly ? 6 : 0, // Limit to 6 for featured projects, fetch all otherwise
    pagination: false,
    where: featuredOnly ? { featured: { equals: true } } : {}, // Filter by featured if specified
  })

  return projects
}

/**
 * Returns an unstable_cache function mapped with the cache tag for 'projects'.
 * Caches projects based on whether we're fetching featured ones or all.
 */
export const getCachedProjects = (featuredOnly = false) =>
  unstable_cache(
    async () => getProjects(1, featuredOnly),
    [featuredOnly ? 'featured-projects' : 'all-projects'], // Unique cache key based on filter
    {
      tags: [featuredOnly ? 'featured-projects' : 'projects'], // Different tags for different caches
      revalidate: 3600, // Revalidate every hour
    },
  )
