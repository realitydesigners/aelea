import { TextBlock as TextBlockType } from '@/lib/types'
import { PortableText } from '@portabletext/react'
import Container from '../ui/Container'

export default function TextBlock({ block }: { block: TextBlockType }) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const fontFamilyMap = {
    didot: 'var(--font-didot), serif',
    brandon: 'var(--font-brandon), sans-serif',
    assistant: 'var(--font-assistant), sans-serif',
    system: 'system-ui, -apple-system, sans-serif',
  }

  const spacingClasses = {
    full: 'px-0',
    container: '', // Container component handles padding
    small: 'px-8',   // 32px
    medium: 'px-16', // 64px
    large: 'px-24',  // 96px
    xl: 'px-32',     // 128px
    '2xl': 'px-40',  // 160px
    '3xl': 'px-48',  // 192px
    custom: '',      // Custom padding handled via inline style
  }

  const alignment = block.alignment || 'left'
  const fontFamily = block.fontFamily || 'didot'
  const spacing = block.spacing || 'container'
  const customPadding = block.customPadding

  const content = (
    <div
      className={`text-base md:text-lg leading-normal text-gray-700 max-w-none ${alignmentClasses[alignment]}`}
      style={{ fontFamily: fontFamilyMap[fontFamily] }}
    >
      <PortableText
        value={block.content}
        components={{
          block: {
            normal: ({ children }) => <p className="mb-4 text-base md:text-lg leading-tight">{children}</p>,
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
          hardBreak: () => <br />,
        }}
      />
    </div>
  )

  // If spacing is 'container', use Container component
  if (spacing === 'container') {
    return (
      <Container className="py-8 bg-white">
        {content}
      </Container>
    )
  }

  // Handle custom padding
  if (spacing === 'custom' && customPadding !== undefined) {
    return (
      <div 
        className="py-8 bg-white"
        style={{ paddingLeft: `${customPadding}px`, paddingRight: `${customPadding}px` }}
      >
        {content}
      </div>
    )
  }

  // For other spacing options, apply padding directly
  return (
    <div className={`py-8 bg-white ${spacingClasses[spacing]}`}>
      {content}
    </div>
  )
}

