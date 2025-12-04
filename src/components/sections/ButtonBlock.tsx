import { ButtonBlock as ButtonBlockType } from '@/lib/types'
import Link from 'next/link'
import Container from '../ui/Container'

export default function ButtonBlock({ block }: { block: ButtonBlockType }) {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  const variantClasses = {
    primary: 'bg-[#3D9BE9] hover:bg-blue-700 text-white',
    secondary: 'bg-teal-600 hover:bg-teal-700 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  }

  const alignment = block.alignment || 'center'
  const variant = block.variant || 'primary'
  const isExternal = block.link?.startsWith('http') || block.link?.startsWith('https')
  const href = block.link || '#'

  const buttonClasses = `
    inline-block px-8 py-3  font-bold text-xl 
    transition-colors duration-200
    ${variantClasses[variant]}
  `.trim()

  const buttonElement = (
    <div className={buttonClasses} style={{ fontFamily: 'var(--font-brandon), sans-serif' }}>
      {block.text}
    </div>
  )

  return (
    <Container className="py-8 bg-white">
      <div className={`flex ${alignmentClasses[alignment]}`}>
        {isExternal ? (
          <a
            href={href}
            target={block.openInNewTab ? '_blank' : '_self'}
            rel={block.openInNewTab ? 'noopener noreferrer' : undefined}
            className="no-underline"
          >
            {buttonElement}
          </a>
        ) : (
          <Link href={href} className="no-underline">
            {buttonElement}
          </Link>
        )}
      </div>
    </Container>
  )
}

