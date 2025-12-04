'use client'

import { ImageSliderBlock as ImageSliderBlockType } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function ImageSliderBlock({ block }: { block: ImageSliderBlockType }) {
  const images = block.images || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoplaySpeed = (block.autoplaySpeed || 2) * 1000 // Convert to milliseconds

  useEffect(() => {
    if (!block.autoplay || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, autoplaySpeed)

    return () => clearInterval(interval)
  }, [block.autoplay, images.length, autoplaySpeed])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  if (images.length === 0) return null

  const currentImage = images[currentIndex]
  const imageUrl = currentImage?.asset ? urlFor(currentImage).width(1400).url() : null
  const alt = currentImage?.alt || `Slider image ${currentIndex + 1}`

  if (!imageUrl) return null

  return (
    <div className="w-full bg-white">
      <div className="relative w-full">
        {/* Main Image */}
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
          {currentImage?.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <p className="text-sm text-center">{currentImage.caption}</p>
            </div>
          )}

          {/* Navigation Arrows */}
          {block.showArrows && images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-lg z-10"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-lg z-10"
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Navigation Dots */}
        {block.showDots && images.length > 1 && (
          <div className="flex justify-center py-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-200 rounded-full ${index === currentIndex
                  ? 'w-8 h-2 bg-teal-600'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
