'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import type { Project, Media } from '@/payload-types'

interface GalleryImage {
  title: string
  image: number | Media
  caption?: string | null
  id?: string | null
}

type GalleryGridBlockClientProps = {
  projects: Project[]
  badgeText?: string
  heading: string
  description?: string
}

export const GalleryGridBlockClient: React.FC<GalleryGridBlockClientProps> = ({
  projects,
  badgeText,
  heading,
  description,
}) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = useCallback((projectIndex: number, imageIndex: number) => {
    setSelectedProject(projectIndex)
    setSelectedImage(imageIndex)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedProject(null)
    setSelectedImage(null)
    document.body.style.overflow = ''
  }, [])

  const currentProject = selectedProject !== null ? projects[selectedProject] : null
  const currentProjectImages = useMemo(
    () => (currentProject?.images ?? []) as GalleryImage[],
    [currentProject],
  )

  const navigateToNext = useCallback(() => {
    if (selectedImage === null || currentProjectImages.length === 0) return
    const nextIndex = selectedImage === currentProjectImages.length - 1 ? 0 : selectedImage + 1
    setSelectedImage(nextIndex)
  }, [selectedImage, currentProjectImages])

  const navigateToPrevious = useCallback(() => {
    if (selectedImage === null || currentProjectImages.length === 0) return
    const prevIndex = selectedImage === 0 ? currentProjectImages.length - 1 : selectedImage - 1
    setSelectedImage(prevIndex)
  }, [selectedImage, currentProjectImages])

  const navigateToIndex = useCallback(
    (index: number) => {
      if (
        selectedImage === null ||
        currentProjectImages.length === 0 ||
        index < 0 ||
        index >= currentProjectImages.length
      )
        return
      setSelectedImage(index)
    },
    [selectedImage, currentProjectImages],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === 'ArrowRight') navigateToNext()
      else if (e.key === 'ArrowLeft') navigateToPrevious()
      else if (e.key === 'Escape') closeLightbox()
      else if (/^[1-9]$/.test(e.key)) navigateToIndex(parseInt(e.key, 10) - 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [navigateToNext, navigateToPrevious, closeLightbox, navigateToIndex, selectedImage])

  const currentImage =
    selectedProject !== null &&
    selectedImage !== null &&
    selectedImage >= 0 &&
    selectedImage < currentProjectImages.length
      ? currentProjectImages[selectedImage]
      : null

  const hasValidImage = (image: GalleryImage['image']): image is Media & { url: string } =>
    typeof image === 'object' && image != null && 'url' in image && image.url != null

  return (
    <>
      <div className="mx-auto max-w-3xl text-center mb-16">
        {badgeText && (
          <div className="inline-block mb-6">
            <span className="inline-block py-1 px-4 rounded-full text-sm font-medium bg-primary/10 backdrop-blur-xs text-primary">
              {badgeText}
            </span>
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          {heading}
        </h1>
        {description && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {projects.map((project, projectIndex) => (
        <div key={project.id} id={`project-${project.slug}`} className="mb-32 last:mb-0">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-4">{project.title}</h2>
            {project.description && (
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {project.images?.map((image, imageIndex) => (
              <div
                key={imageIndex}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openLightbox(projectIndex, imageIndex)}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={typeof image.image === 'object' && image.image?.url ? image.image.url : ''}
                    alt={image.title || `Obrázek ${imageIndex + 1}`}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2 mb-3">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                    {image.caption && <p className="text-sm text-white/90 mt-1">{image.caption}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {currentImage && hasValidImage(currentImage.image) && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-5xl w-full mx-6 aspect-[16/9] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={`${selectedProject}-${selectedImage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentImage.image.url}
                  alt={currentImage.title}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
              </motion.div>

              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 cursor-pointer rounded-full bg-background/20 backdrop-blur-md hover:bg-background/40 transition-colors"
                aria-label="Zavřít"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateToPrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 cursor-pointer rounded-full bg-background/20 backdrop-blur-md hover:bg-background/40 active:bg-background/60 transition-all transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation"
                aria-label="Předchozí obrázek"
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateToNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 cursor-pointer rounded-full bg-background/20 backdrop-blur-md hover:bg-background/40 active:bg-background/60 transition-all transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation"
                aria-label="Další obrázek"
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex justify-between items-end">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{currentImage.title}</h3>
                    {currentImage.caption && (
                      <p className="text-white/90">{currentImage.caption}</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="mb-2 text-white/70 text-xs">
                      Použijte klávesy pro rychlou navigaci
                    </div>
                    <div className="flex gap-2 mb-2">
                      {currentProjectImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedImage(idx)
                          }}
                          className={`w-2.5 h-2.5 cursor-pointer rounded-full transition-all ${
                            idx === selectedImage
                              ? 'bg-white scale-125'
                              : 'bg-white/40 hover:bg-white/70'
                          }`}
                          aria-label={`Přejít na obrázek ${idx + 1}`}
                        />
                      ))}
                    </div>
                    <span className="text-white/70 text-sm">
                      {(selectedImage ?? 0) + 1} / {currentProjectImages.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}

GalleryGridBlockClient.displayName = 'GalleryGridBlockClient'
