'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project, Media } from '@/payload-types'

interface GalleryImage {
  title: string
  image: number | Media
  caption?: string | null
  id?: string | null
}

type GalleryGridBlockClientProps = {
  projects: Project[]
}

export const GalleryGridBlockClient: React.FC<GalleryGridBlockClientProps> = ({ projects }) => {
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
  const currentProjectImages = (currentProject?.images ?? []) as GalleryImage[]

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
  }, [navigateToNext, navigateToPrevious, closeLightbox, navigateToIndex])

  useEffect(() => {
    if (!projects.length || !projects[0]) return

    const firstProject = projects[0]
    const images = firstProject.images ?? []
    const imagesPerProject = images.length > 0 ? images.length : 1

    const imageElements = document.querySelectorAll('.group.relative.aspect-[4/3]')

    imageElements.forEach((element, index) => {
      const projectIndex = Math.floor(index / imagesPerProject)
      const imageIndex = index % imagesPerProject
      element.addEventListener('click', () => openLightbox(projectIndex, imageIndex))
    })

    return () => {
      imageElements.forEach((element, index) => {
        const projectIndex = Math.floor(index / imagesPerProject)
        const imageIndex = index % imagesPerProject
        element.removeEventListener('click', () => openLightbox(projectIndex, imageIndex))
      })
    }
  }, [projects, openLightbox])

  const currentImage =
    selectedProject !== null &&
    selectedImage !== null &&
    selectedImage >= 0 &&
    selectedImage < currentProjectImages.length
      ? currentProjectImages[selectedImage]
      : null

  const hasValidImage = (image: GalleryImage['image']): image is Media & { url: string } =>
    typeof image === 'object' && image != null && 'url' in image && image.url != null

  if (!currentImage || !hasValidImage(currentImage.image)) {
    return null
  }

  const { image, title, caption } = currentImage
  const imageUrl = image.url

  return (
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
              src={imageUrl}
              alt={title}
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
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                {caption && <p className="text-white/90">{caption}</p>}
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
  )
}

GalleryGridBlockClient.displayName = 'GalleryGridBlockClient'
