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
  overlayText?: PortableTextBlock[]
  overlayPosition?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  overlayTextColor?: 'white' | 'black' | 'gray-300' | 'gray-700'
  overlayBackground?: 'none' | 'dark' | 'light'
}

export interface TextBlock {
  _type: 'textBlock'
  _key: string
  content: PortableTextBlock[]
  alignment?: 'left' | 'center' | 'right'
  fontFamily?: 'didot' | 'brandon' | 'assistant' | 'system'
  spacing?: 'full' | 'container' | 'small' | 'medium' | 'large' | 'xl' | '2xl' | '3xl' | 'custom'
  customPadding?: number
}

export interface ImageTextBlock {
  _type: 'imageTextBlock'
  _key: string
  image: SanityImage
  text: PortableTextBlock[]
  layout?: 'imageLeft' | 'imageRight' | 'imageTop' | 'imageBottom'
  fontFamily?: 'didot' | 'brandon' | 'assistant' | 'system'
  linkedPost?: {
    _ref: string
    _type: 'reference'
    slug?: { current: string }
  }
  openInNewTab?: boolean
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

export interface CollageBlock {
  _type: 'collageBlock'
  _key: string
  images: SanityImage[]
  columns?: 2 | 3 | 4
  gap?: 'tight' | 'comfy' | 'roomy'
}

export interface VideoBlock {
  _type: 'videoBlock'
  _key: string
  url?: string
  videoFile?: {
    asset: {
      _ref: string
      _type: 'reference'
      url?: string
      originalFilename?: string
      mimeType?: string
    }
  }
  caption?: string
  autoplay?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
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

export interface SocialLinksBlock {
  _type: 'socialLinksBlock'
  _key: string
  instagram?: string
  soundcloud?: string
  facebook?: string
  youtube?: string
  email?: string
  alignment?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg'
}

export interface ContactFormBlock {
  _type: 'contactFormBlock'
  _key: string
  title?: string
  description?: string
  formspreeEndpoint?: string
  buttonLabel?: string
  includeMailingListCheckbox?: boolean
  successMessage?: string
  errorMessage?: string
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt?: string
  excerpt?: string
  categories?: string[]
  coverImage?: SanityImage
  body?: PortableTextBlock[]
  contentBlocks?: ContentBlock[]
}

export type ContentBlock =
  | ImageBlock
  | TextBlock
  | ImageTextBlock
  | HeadingBlock
  | ImageGalleryBlock
  | CollageBlock
  | VideoBlock
  | SpacerBlock
  | ImageSliderBlock
  | ButtonBlock
  | SocialLinksBlock
  | ContactFormBlock

// Navigation Types
export interface NavigationChild {
  label: string
  linkType: 'page' | 'external'
  page?: {
    _id: string
    title: string
    slug: {
      current: string
    }
  }
  externalUrl?: string
}

export interface NavigationItem {
  _id: string
  title: string
  label: string
  linkType: 'page' | 'external' | 'none'
  page?: {
    _id: string
    title: string
    slug: {
      current: string
    }
  }
  externalUrl?: string
  children?: NavigationChild[]
  order?: number
}

