import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { client, urlFor } from '@/lib/sanity.client'
import { postBySlugQuery } from '@/lib/queries'
import type { Post } from '@/lib/types'
import Container from '@/components/ui/Container'
import BlockRenderer from '@/components/sections'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch<Post | null>(postBySlugQuery, { slug })
  } catch (err) {
    console.error('Error fetching post', err)
    return null
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const cover = post?.coverImage?.asset ? urlFor(post.coverImage).width(1200).height(800).url() : null

  return (
    <main className="min-h-screen bg-white py-12">
      <Container className="max-w-4xl">
        {post?.title && (
          <h1 className="text-4xl font-semibold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-didot), serif' }}>
            {post.title}
          </h1>
        )}
        {post?.publishedAt && (
          <p className="mt-2 text-sm text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        )}

        {cover && (
          <div className="mt-6 overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={cover}
              alt={post?.title || ''}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        )}

        {post?.excerpt && (
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {post?.contentBlocks?.length ? (
          <div className="mt-10 space-y-10">
            {post.contentBlocks.map((block) => (
              <BlockRenderer key={block._key} block={block} />
            ))}
          </div>
        ) : post?.body ? (
          <div className="mt-8 prose max-w-none">
            <PortableText value={post.body} />
          </div>
        ) : (
          <p className="mt-8 text-gray-500">No content.</p>
        )}
      </Container>
    </main>
  )
}


