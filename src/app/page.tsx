import { Metadata } from 'next'
import { client } from '@/lib/sanity.client'
import { pageQuery } from '@/lib/queries'
import { Page } from '@/lib/types'
import BlockRenderer from '@/components/sections'

export const revalidate = 60
export const dynamic = 'force-dynamic' // Always server-render to avoid build-time issues

async function getHomePage(): Promise<Page | null> {
  try {
    // Fetch page with slug "home"
    const page = await client.fetch<Page>(pageQuery, { slug: 'home' })

    if (!page) {
      console.error('Home page not found in Sanity')
      return null
    }

    return page
  } catch (error) {
    console.error('Error fetching home page:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack)
    }
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getHomePage()

    if (!page) {
      return {
        title: 'Area Site',
        description: 'A beautiful website built with Next.js and Sanity',
      }
    }

    const title = page.seo?.title || page.title
    const description = page.seo?.description || ''

    return {
      title,
      description,
      openGraph: { title, description },
    }
  } catch (error) {
    // Always return valid metadata, even if there's an error
    console.error('Error in generateMetadata:', error)
    return {
      title: 'Area Site',
      description: 'A beautiful website built with Next.js and Sanity',
    }
  }
}

export default async function Home() {
  let page: Page | null = null
  let error: string | null = null

  try {
    page = await getHomePage()
  } catch (err) {
    console.error('Error in Home component:', err)
    error = err instanceof Error ? err.message : 'Unknown error'
  }

  // Always render something - never throw or return null
  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome</h1>
          <p className="text-gray-600 mb-2">Home page content is being loaded...</p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-600">Error: {error}</p>
              <p className="text-xs text-red-500 mt-2">
                Check Vercel environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
              </p>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-4">
            If this persists, please check that the home page exists in Sanity CMS.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {page.contentBlocks && page.contentBlocks.length > 0 ? (
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
