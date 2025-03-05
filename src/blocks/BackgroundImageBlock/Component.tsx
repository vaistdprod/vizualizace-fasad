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
  // Using this approach to avoid TypeScript errors until types are regenerated
  const opacity = (props as any).opacity ?? 0.15

  const backgroundImageUrl =
    typeof image === 'object' && 'url' in image && image.url
      ? image.url
      : typeof image === 'string'
        ? image // If image is an ID, this won't work directly—Payload resolves it server-side
        : ''

  return (
    <section className="relative w-full overflow-hidden" id={`block-${id}`}>
      {/* Next.js Image component for optimization */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={backgroundImageUrl}
            alt="Obrázek na pozadí"
            fill
            sizes="100vw"
            priority
            quality={85}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: 0,
              opacity,
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
