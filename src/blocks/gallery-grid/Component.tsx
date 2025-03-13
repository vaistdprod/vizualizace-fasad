'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryGridBlock as GalleryGridBlockProps } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/utilities/animations'

export const GalleryGridBlock: React.FC<GalleryGridBlockProps & { id?: string }> = (props) => {
  const { id, projects, heading, description, badgeText } = props
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const navigateToNext = useCallback(() => {
    if (selectedImage === null || !projects) return

    const nextIndex = selectedImage === projects.length - 1 ? 0 : selectedImage + 1
    setSelectedImage(nextIndex)
  }, [selectedImage, projects])

  const navigateToPrevious = useCallback(() => {
    if (selectedImage === null || !projects) return

    const prevIndex = selectedImage === 0 ? projects.length - 1 : selectedImage - 1
    setSelectedImage(prevIndex)
  }, [selectedImage, projects])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      if (e.key === 'ArrowRight') {
        navigateToNext()
      } else if (e.key === 'ArrowLeft') {
        navigateToPrevious()
      } else if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, navigateToNext, navigateToPrevious])

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="mx-auto max-w-3xl text-center mb-20"
      >
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
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        id={`block-${id}`}
      >
        {projects?.map((project, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="group relative aspect-[4/3] cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <Image
                src={
                  typeof project.image === 'object' && project.image?.url ? project.image.url : ''
                }
                alt={project.title}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-lg font-semibold text-white drop-">{project.title}</h3>
                <p className="text-sm text-white/90 drop-">{project.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage !== null && projects && projects[selectedImage] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-5xl w-full mx-6 aspect-[16/9] rounded-lg overflow-hidden "
              aria-label="Zavřít"
            >
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={
                    typeof projects[selectedImage].image === 'object' &&
                    projects[selectedImage].image?.url
                      ? projects[selectedImage].image.url
                      : ''
                  }
                  alt={projects[selectedImage].title}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
              </motion.div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
                className="absolute top-4 right-4 p-2 cursor-pointer rounded-full bg-background/20 backdrop-blur-md hover:bg-background/40 transition-colors"
                aria-label="Zavřít"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* Previous button */}
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

              {/* Next button */}
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
                  {/* Image info - left side */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white drop-">
                      {projects[selectedImage].title}
                    </h3>
                    <p className="text-white/90 drop-">{projects[selectedImage].location}</p>
                  </div>

                  {/* Pagination - right side */}
                  <div className="flex flex-col items-end">
                    {/* Pagination dots */}
                    <div className="flex gap-2 mb-2">
                      {projects.map((_, idx) => (
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

                    {/* Image counter */}
                    <span className="text-white/70 text-sm">
                      {selectedImage + 1} / {projects.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
