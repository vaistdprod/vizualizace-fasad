import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Post } from '@/payload-types'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ids =
    searchParams
      .get('ids')
      ?.split(',')
      .map((id) => Number(id.trim())) || []

  if (!ids.length) {
    return NextResponse.json({ error: 'No post IDs provided' }, { status: 400 })
  }

  try {
    console.log('Fetching posts with IDs:', ids) // Debug: log the IDs being fetched
    const payload = await getPayload({ config: configPromise })
    const fullPosts = await Promise.all(
      ids.map(async (postId) => {
        if (isNaN(postId)) {
          console.warn(`Invalid post ID: ${postId}`)
          return null
        }
        try {
          const post = await payload.findByID({
            collection: 'posts',
            id: postId.toString(),
            depth: 3, // Ensure full Post object with heroImage.url and publishedAt
          })
          console.log(`Fetched post ${postId}:`, post) // Debug: log each post
          return post as Post
        } catch (error) {
          console.error(`Error fetching post ${postId}:`, error)
          return null
        }
      }),
    )

    // Filter out null or undefined posts and log for debugging
    const validPosts = fullPosts.filter((post): post is Post => post !== null && post !== undefined)
    console.log('Valid Posts Fetched:', validPosts)

    if (!validPosts.length) {
      return NextResponse.json({ error: 'No valid posts found' }, { status: 404 })
    }

    return NextResponse.json(validPosts)
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    } else {
      errorMessage = 'Unknown error occurred'
    }
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 },
    )
  }
}
