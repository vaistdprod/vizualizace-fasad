'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { GalleryGridBlock as GalleryGridBlockProps } from '@/payload-types'

export const GalleryGridBlock: React.FC<GalleryGridBlockProps & { id?: string }> = (props) => {
  const { id, projects } = props
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        id={`block-${id}`}
      >
        {projects?.map((project, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
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
                className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-lg font-semibold text-white drop-shadow-lg">{project.title}</h3>
                <p className="text-sm text-white/90 drop-shadow-lg">{project.location}</p>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-5xl w-full mx-6 aspect-[16/9] rounded-lg overflow-hidden shadow-xl"
              aria-label="Zavřít"
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
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors"
                aria-label="Zavřít"
              >
                <X className="h-6 w-6 text-white" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-semibold text-white drop-shadow-lg">
                  {projects[selectedImage].title}
                </h3>
                <p className="text-white/90 drop-shadow-lg">{projects[selectedImage].location}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
