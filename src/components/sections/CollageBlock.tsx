'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { CollageBlock as CollageBlockType } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import Container from '../ui/Container'

export default function CollageBlock({ block }: { block: CollageBlockType }) {
  const images = block.images || []
  const columns = block.columns || 3
  const gap = block.gap || 'comfy'

  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (images.length === 0) return null

  const columnClasses: Record<number, string> = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  // Force 3 columns on large screens to match request
  const effectiveColumns = 3

  const gapClasses: Record<string, string> = {
    tight: 'gap-2',
    comfy: 'gap-4',
    roomy: 'gap-6',
  }

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, goPrev, goNext])

  return (
    <>
      <Container className="py-8 bg-white">
        <div className={`grid max-w-5xl mx-auto ${columnClasses[effectiveColumns]} ${gapClasses[gap]}`}>
          {images.map((image, index) => {
            const imageUrl = image?.asset ? urlFor(image).width(900).height(600).url() : null
            const alt = image?.alt || `Collage image ${index + 1}`

            if (!imageUrl) return null

            return (
              <button
                key={index}
                type="button"
                className="relative w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                onClick={() => openModal(index)}
              >
                <Image
                  src={imageUrl}
                  alt={alt}
                  width={900}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                />
              </button>
            )
          })}
        </div>
      </Container>

      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 px-4">
          <button
            className="absolute inset-0 w-full h-full cursor-default"
            aria-label="Close collage"
            onClick={closeModal}
          />
          <div className="relative z-10 w-full max-w-5xl max-h-[90vh]">
            <div className="relative w-full h-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
              {(() => {
                const activeImage = images[currentIndex]
                const activeUrl = activeImage?.asset ? urlFor(activeImage).width(1800).height(1200).url() : null
                const alt = activeImage?.alt || `Collage image ${currentIndex + 1}`
                if (!activeUrl) return null
                return (
                  <Image
                    src={activeUrl}
                    alt={alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                )
              })()}
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full p-2 hover:bg-white shadow"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full p-2 hover:bg-white shadow"
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                aria-label="Next image"
              >
                ›
              </button>
              <button
                className="absolute top-3 right-3 bg-white/80 text-black rounded-full px-3 py-1 hover:bg-white shadow"
                onClick={(e) => {
                  e.stopPropagation()
                  closeModal()
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            {images[currentIndex]?.caption && (
              <p className="mt-3 text-center text-white text-sm">
                {images[currentIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}


