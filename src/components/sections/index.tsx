import { ContentBlock } from '@/lib/types'
import ImageBlock from './ImageBlock'
import TextBlock from './TextBlock'
import ImageTextBlock from './ImageTextBlock'
import HeadingBlock from './HeadingBlock'
import ImageGalleryBlock from './ImageGalleryBlock'
import VideoBlock from './VideoBlock'
import SpacerBlock from './SpacerBlock'
import ImageSliderBlock from './ImageSliderBlock'
import ButtonBlock from './ButtonBlock'

interface BlockRendererProps {
  block: ContentBlock
}

export default function BlockRenderer({ block }: BlockRendererProps) {
  switch (block._type) {
    case 'imageBlock':
      return <ImageBlock block={block} />
    case 'textBlock':
      return <TextBlock block={block} />
    case 'imageTextBlock':
      return <ImageTextBlock block={block} />
    case 'headingBlock':
      return <HeadingBlock block={block} />
    case 'imageGalleryBlock':
      return <ImageGalleryBlock block={block} />
    case 'videoBlock':
      return <VideoBlock block={block} />
    case 'spacerBlock':
      return <SpacerBlock block={block} />
    case 'imageSliderBlock':
      return <ImageSliderBlock block={block} />
    case 'buttonBlock':
      return <ButtonBlock block={block} />
    default:
      return null
  }
}

