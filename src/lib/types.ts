import { PortableTextBlock } from '@sanity/types'
import type { SanityImageSource } from '@sanity/image-url'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface SEO {
  title?: string
  description?: string
  image?: SanityImageSource
}

export interface Page {
  _id: string
  title: string
  slug: {
    current: string
  }
  seo?: SEO
  contentBlocks?: ContentBlock[]
}

// Content Block Types
export interface ImageBlock {
  _type: 'imageBlock'
  _key: string
  image: SanityImage
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  alignment?: 'left' | 'center' | 'right'
}

export interface TextBlock {
  _type: 'textBlock'
  _key: string
  content: PortableTextBlock[]
  alignment?: 'left' | 'center' | 'right'
  fontFamily?: 'didot' | 'brandon' | 'assistant' | 'system'
}

export interface ImageTextBlock {
  _type: 'imageTextBlock'
  _key: string
  image: SanityImage
  text: PortableTextBlock[]
  layout?: 'imageLeft' | 'imageRight' | 'imageTop' | 'imageBottom'
  fontFamily?: 'didot' | 'brandon' | 'assistant' | 'system'
}

export interface HeadingBlock {
  _type: 'headingBlock'
  _key: string
  text: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  alignment?: 'left' | 'center' | 'right'
}

export interface ImageGalleryBlock {
  _type: 'imageGalleryBlock'
  _key: string
  images: SanityImage[]
  columns?: 1 | 2 | 3 | 4
  gap?: 'small' | 'medium' | 'large'
}

export interface VideoBlock {
  _type: 'videoBlock'
  _key: string
  url?: string
  videoFile?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  caption?: string
  autoplay?: boolean
}

export interface SpacerBlock {
  _type: 'spacerBlock'
  _key: string
  height?: 'small' | 'medium' | 'large' | 'xlarge'
}

export interface ImageSliderBlock {
  _type: 'imageSliderBlock'
  _key: string
  images: SanityImage[]
  autoplay?: boolean
  autoplaySpeed?: number
  showDots?: boolean
  showArrows?: boolean
}

export interface ButtonBlock {
  _type: 'buttonBlock'
  _key: string
  text: string
  link: string
  alignment?: 'left' | 'center' | 'right'
  variant?: 'primary' | 'secondary' | 'outline'
  openInNewTab?: boolean
}

export type ContentBlock =
  | ImageBlock
  | TextBlock
  | ImageTextBlock
  | HeadingBlock
  | ImageGalleryBlock
  | VideoBlock
  | SpacerBlock
  | ImageSliderBlock
  | ButtonBlock

