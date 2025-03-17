// src/blocks/background-image/Component.tsx
import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { BackgroundImageBlock as BackgroundImageBlockType } from '@/payload-types'
import { GridPattern } from '@/components/ui/grid-pattern'
import { DotPattern } from '@/components/ui/dot-pattern'

export const BackgroundImageBlock: React.FC<
  BackgroundImageBlockType & {
    id?: string
    children?: React.ReactNode
  }
> = (props) => {
  const { id, backgroundType, image, opacity = 0.15, children } = props

  // Handle image URL with stricter type checking
  let backgroundImageUrl = ''
  if (image && typeof image === 'object' && 'url' in image && image.url) {
    backgroundImageUrl = image.url
  } else if (typeof image === 'string') {
    backgroundImageUrl = image
  }

  return (
    <section className="relative w-full overflow-hidden" id={`block-${id}`}>
      {/* Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        {backgroundType === 'image' && backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt={
              image && typeof image === 'object' && 'alt' in image && image.alt
                ? image.alt
                : 'Background Image'
            }
            fill
            sizes="100vw"
            loading="eager"
            priority={true}
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5jYI2iwAAAABJRU5ErkJggg=="
            fetchPriority="high"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: opacity ?? 0.15,
              willChange: 'transform',
            }}
          />
        ) : backgroundType === 'gridPattern' ? (
          <GridPattern
            width={40}
            height={40}
            x={-1}
            y={-1}
            strokeDasharray="0"
            className={cn(
              'h-full w-full fill-gray-400/20 stroke-gray-400/20',
              '[mask-image:linear-gradient(to_bottom_right,white,transparent)]',
              'animate-fade-loop',
            )}
          />
        ) : backgroundType === 'dotPattern' ? (
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
              'h-full w-full',
              '[mask-image:linear-gradient(to_bottom_right,white,transparent)]',
              'animate-fade-loop',
            )}
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
