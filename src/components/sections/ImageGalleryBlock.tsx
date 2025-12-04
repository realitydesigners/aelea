import { ImageGalleryBlock as ImageGalleryBlockType } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import Image from 'next/image'
import Container from '../ui/Container'

export default function ImageGalleryBlock({ block }: { block: ImageGalleryBlockType }) {
  const images = block.images || []
  const columns = block.columns || 2
  const gap = block.gap || 'medium'

  if (images.length === 0) return null

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  const gapClasses = {
    small: 'gap-4',
    medium: 'gap-6',
    large: 'gap-8',
  }

  return (
    <Container className="py-8 bg-white">
      <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]}`}>
        {images.map((image, index) => {
          const imageUrl = image?.asset ? urlFor(image).width(800).url() : null
          const alt = image?.alt || `Gallery image ${index + 1}`

          if (!imageUrl) return null

          return (
            <div key={index} className="relative">
              <Image
                src={imageUrl}
                alt={alt}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg object-cover"
              />
              {image?.caption && (
                <p className="mt-2 text-sm text-gray-600 italic">
                  {image.caption}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </Container>
  )
}

