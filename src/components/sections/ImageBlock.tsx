import { ImageBlock as ImageBlockType } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import Image from 'next/image'
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

  const sizeClass = sizeClasses[size]
  const borderRadiusClass = borderRadiusClasses[borderRadius]
  const alignmentClass = alignmentClasses[alignment]

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

