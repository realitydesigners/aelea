import { client } from '@/lib/sanity.client'
import { pageQuery } from '@/lib/queries'
import type { Page } from '@/lib/types'
import Container from '@/components/ui/Container'
import BlockRenderer from '@/components/sections'

export const revalidate = 60

async function getPage(): Promise<Page | null> {
  try {
    return await client.fetch<Page>(pageQuery, { slug: 'blog' })
  } catch (err) {
    console.error('Error fetching blog page', err)
    return null
  }
}

export default async function BlogPage() {
  const page = await getPage()

  return (
    <main className="min-h-screen bg-white py-12">
      {/* Render any blocks configured on the Blog page in Sanity */}
      {page?.contentBlocks?.length ? (
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {page.contentBlocks.map((block) => {
              const isCard = block._type === 'imageTextBlock'
              return (
                <div key={block._key} className={isCard ? '' : 'md:col-span-2'}>
                  <BlockRenderer block={block} />
                </div>
              )
            })}
          </div>
        </Container>
      ) : null}
    </main>
  )
}


