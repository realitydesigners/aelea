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

  const alignment = block.alignment || 'left'
  const fontFamily = block.fontFamily || 'didot'

  return (
    <Container className="py-8 bg-white">
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
          }}
        />
      </div>
    </Container>
  )
}

