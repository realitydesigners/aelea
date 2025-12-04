import { SpacerBlock as SpacerBlockType } from '@/lib/types'

export default function SpacerBlock({ block }: { block: SpacerBlockType }) {
  const heightClasses = {
    small: 'h-8',
    medium: 'h-16',
    large: 'h-24',
    xlarge: 'h-32',
  }

  const height = block.height || 'medium'

  return <div className={heightClasses[height]} />
}

