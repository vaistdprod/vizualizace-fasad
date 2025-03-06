// src/blocks/BackgroundImageBlock/Component.tsx
import React from 'react'
import Image from 'next/image'
import type { BackgroundImageBlock as BackgroundImageBlockType } from '@/payload-types'

export const BackgroundImageBlock: React.FC<
  BackgroundImageBlockType & {
    id?: string
    children?: React.ReactNode
  }
> = (props) => {
  const { id, image, children } = props
  // Access opacity with a fallback to 0.15 if not provided
  // Using a more specific type instead of any
  const opacity = (props as { opacity?: number }).opacity ?? 0.15

  // Extract the nested ternary into a more readable form
  let backgroundImageUrl = ''
  if (typeof image === 'object' && 'url' in image && image.url) {
    backgroundImageUrl = image.url
  } else if (typeof image === 'string') {
    backgroundImageUrl = image // If image is an ID, this won't work directly—Payload resolves it server-side
  }

  return (
    <section className="relative w-full overflow-hidden" id={`block-${id}`}>
      {/* Next.js Image component for optimization */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={backgroundImageUrl}
            alt={
              typeof image === 'object' && 'alt' in image && image.alt
                ? image.alt
                : 'Obrázek na pozadí'
            }
            fill
            sizes="100vw"
            loading="eager" // Background images should load eagerly for better UX
            priority={true} // Background images are critical for page appearance
            quality={75} // Slightly lower quality for background images is acceptable
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5jYI2iwAAAABJRU5ErkJggg=="
            fetchPriority="high"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: 0,
              opacity,
              willChange: 'transform',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
