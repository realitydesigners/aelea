import { HeadingBlock as HeadingBlockType } from '@/lib/types'
import Heading from '../ui/Heading'
import Container from '../ui/Container'

export default function HeadingBlock({ block }: { block: HeadingBlockType }) {
    return (
        <Container className="py-8 bg-white">
            <Heading
                level={block.level || 2}
                alignment={block.alignment || 'left'}
            >
                {block.text}
            </Heading>
        </Container>
    )
}

