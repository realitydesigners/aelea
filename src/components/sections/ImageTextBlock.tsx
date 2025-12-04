import { ImageTextBlock as ImageTextBlockType } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Container from '../ui/Container'

export default function ImageTextBlock({ block }: { block: ImageTextBlockType }) {
  const imageUrl = block.image?.asset ? urlFor(block.image).width(800).url() : null
  const alt = block.image?.alt || ''
  const layout = block.layout || 'imageLeft'
  const fontFamily = block.fontFamily || 'didot'

  if (!imageUrl) return null

  const fontFamilyMap = {
    didot: 'var(--font-didot), serif',
    brandon: 'var(--font-brandon), sans-serif',
    assistant: 'var(--font-assistant), sans-serif',
    system: 'system-ui, -apple-system, sans-serif',
  }

  const isHorizontal = layout === 'imageLeft' || layout === 'imageRight'
  const imageFirst = layout === 'imageLeft' || layout === 'imageTop'

  const containerClass = isHorizontal
    ? 'flex flex-col md:flex-row gap-8 items-center'
    : 'flex flex-col gap-6'

  const imageOrder = imageFirst ? 'order-1' : 'order-2'
  const textOrder = imageFirst ? 'order-2' : 'order-1'

  return (
    <Container className="py-8 bg-white">
      <div className={containerClass}>
        <div className={`${imageOrder} ${isHorizontal ? 'w-full md:w-1/2' : 'w-full'}`}>
          <Image
            src={imageUrl}
            alt={alt}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className={`${textOrder} ${isHorizontal ? 'w-full md:w-1/2' : 'w-full'}`}>
          <div 
            className="text-base md:text-lg leading-relaxed text-gray-700 max-w-none"
            style={{ fontFamily: fontFamilyMap[fontFamily] }}
          >
            <PortableText 
              value={block.text}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-4 text-base md:text-lg">{children}</p>,
                  h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold mb-2">{children}</h3>,
                },
                marks: {
                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>,
                },
                list: {
                  bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                  number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                },
                listItem: {
                  bullet: ({ children }) => <li className="ml-4">{children}</li>,
                  number: ({ children }) => <li className="ml-4">{children}</li>,
                },
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

