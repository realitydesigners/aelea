export const dynamic = 'force-dynamic'

export default async function DebugPage() {
  const envVars = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'NOT SET',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'NOT SET',
    hasToken: !!process.env.SANITY_API_TOKEN,
    nodeEnv: process.env.NODE_ENV,
  }

  let sanityTest = null
  try {
    const { client } = await import('@/lib/sanity.client')
    const testQuery = '*[_type == "page"][0]{_id, title}'
    sanityTest = await client.fetch(testQuery)
  } catch (error) {
    sanityTest = {
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(envVars, null, 2)}</pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Sanity Connection Test</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(sanityTest, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

