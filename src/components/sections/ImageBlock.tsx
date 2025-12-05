import { ImageBlock as ImageBlockType } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Container from '../ui/Container'

export default function ImageBlock({ block }: { block: ImageBlockType }) {
  const imageUrl = block.image?.asset ? urlFor(block.image).width(1200).url() : null
  const alt = block.image?.alt || ''

  if (!imageUrl) return null

  const sizeClasses = {
    xs: 'max-w-[200px]',
    sm: 'max-w-[300px]',
    md: 'max-w-[500px]',
    lg: 'max-w-[700px]',
    xl: 'max-w-[900px]',
    full: 'w-full',
  }

  const borderRadiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  }

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  const size = block.size || 'md'
  const borderRadius = block.borderRadius || 'md'
  const alignment = block.alignment || 'center'
  const overlayPosition = block.overlayPosition || 'center'
  const overlayTextColor = block.overlayTextColor || 'white'
  const overlayBackground = block.overlayBackground || 'none'
  const overlayText = block.overlayText
  const hasOverlay = overlayText && overlayText.length > 0

  const sizeClass = sizeClasses[size]
  const borderRadiusClass = borderRadiusClasses[borderRadius]
  const alignmentClass = alignmentClasses[alignment]

  // Position classes for overlay
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'center-left': 'top-1/2 left-4 -translate-y-1/2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'center-right': 'top-1/2 right-4 -translate-y-1/2',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  }

  // Text color classes
  const textColorClasses = {
    white: 'text-white',
    black: 'text-black',
    'gray-300': 'text-gray-300',
    'gray-700': 'text-gray-700',
  }

  // Background overlay classes
  const backgroundClasses = {
    none: '',
    dark: 'bg-black/50',
    light: 'bg-white/50',
  }

  // For circular images, ensure aspect ratio is 1:1
  const isCircular = borderRadius === 'full'
  const sizeWidthMap = {
    xs: 'w-[200px]',
    sm: 'w-[300px]',
    md: 'w-[500px]',
    lg: 'w-[700px]',
    xl: 'w-[900px]',
    full: 'w-full',
  }
  
  const imageWrapperClass = isCircular 
    ? `relative ${sizeWidthMap[size]} aspect-square overflow-hidden mx-auto`
    : `relative ${sizeClass} w-full`

  return (
    <Container className="py-8 bg-white">
      <div className={`flex ${alignmentClass}`}>
        <div className={imageWrapperClass}>
          <Image
            src={imageUrl}
            alt={alt}
            width={1200}
            height={800}
            className={`w-full h-full ${borderRadiusClass} object-cover`}
            priority={false}
          />
          {/* Text Overlay */}
          {hasOverlay && overlayText && (
            <div 
              className={`absolute ${positionClasses[overlayPosition]} ${textColorClasses[overlayTextColor]} z-10 max-w-[90%] px-4 py-2 ${backgroundClasses[overlayBackground]} ${overlayBackground !== 'none' ? 'rounded-lg' : ''}`}
            >
              <PortableText
                value={overlayText}
                components={{
                  block: {
                    normal: ({ children }) => <p className="text-lg md:text-xl font-medium leading-tight">{children}</p>,
                    h1: ({ children }) => <h1 className="text-2xl md:text-3xl font-bold leading-tight">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl md:text-2xl font-bold leading-tight">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg md:text-xl font-bold leading-tight">{children}</h3>,
                  },
                  marks: {
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                  },
                  hardBreak: () => <br />,
                }}
              />
            </div>
          )}
        </div>
      </div>
      {block.image?.caption && (
        <div className={`flex ${alignmentClass} mt-2`}>
          <p className={`text-sm text-gray-600 italic ${isCircular ? sizeWidthMap[size] : sizeClass}`}>
            {block.image.caption}
          </p>
        </div>
      )}
    </Container>
  )
}

