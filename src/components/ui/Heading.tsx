import { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  alignment?: 'left' | 'center' | 'right'
}

export default function Heading({
  children,
  level = 2,
  className = '',
  alignment = 'left',
}: HeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const baseClasses = `font-bold text-gray-900 ${alignmentClasses[alignment]} ${className}`

  const sizeClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl lg:text-5xl',
    3: 'text-2xl md:text-3xl lg:text-4xl',
    4: 'text-xl md:text-2xl lg:text-3xl',
    5: 'text-lg md:text-xl lg:text-2xl',
    6: 'text-base md:text-lg lg:text-xl',
  }

  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  switch (HeadingTag) {
    case 'h1':
      return <h1 className={`${baseClasses} ${sizeClasses[level]}`}>{children}</h1>
    case 'h2':
      return <h2 className={`${baseClasses} ${sizeClasses[level]}`}>{children}</h2>
    case 'h3':
      return <h3 className={`${baseClasses} ${sizeClasses[level]}`}>{children}</h3>
    case 'h4':
      return <h4 className={`${baseClasses} ${sizeClasses[level]}`}>{children}</h4>
    case 'h5':
      return <h5 className={`${baseClasses} ${sizeClasses[level]}`}>{children}</h5>
    case 'h6':
      return <h6 className={`${baseClasses} ${sizeClasses[level]}`}>{children}</h6>
    default:
      return <h2 className={`${baseClasses} ${sizeClasses[level]}`}>{children}</h2>
  }
}

