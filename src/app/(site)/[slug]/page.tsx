import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client, urlFor } from '@/lib/sanity.client'
import { pageQuery } from '@/lib/queries'
import { Page } from '@/lib/types'
import BlockRenderer from '@/components/sections'

interface PageProps {
  params: { slug: string }
}

export const revalidate = 60

async function getPage(slug: string): Promise<Page | null> {
  try {
    return await client.fetch<Page>(pageQuery, { slug })
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  const page = await getPage(slug)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  const title = page.seo?.title || page.title
  const description = page.seo?.description || ''
  const ogImage = page.seo?.image
    ? urlFor(page.seo.image).width(1200).height(630).url()
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = params
  const page = await getPage(slug)

  if (!page) notFound()

  return (
    <main className="min-h-screen bg-white">
      {page.contentBlocks?.length ? (
        page.contentBlocks.map((block) => (
          <BlockRenderer key={block._key} block={block} />
        ))
      ) : (
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
          <p className="text-gray-600">No content blocks configured for this page.</p>
        </div>
      )}
    </main>
  )
}
