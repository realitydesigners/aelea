import { VideoBlock as VideoBlockType } from '@/lib/types'
import Container from '../ui/Container'

export default function VideoBlock({ block }: { block: VideoBlockType }) {
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    const videoId = match && match[2].length === 11 ? match[2] : null
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  const getVimeoEmbedUrl = (url: string) => {
    const regExp = /vimeo.com\/(\d+)/
    const match = url.match(regExp)
    const videoId = match ? match[1] : null
    return videoId ? `https://player.vimeo.com/video/${videoId}` : null
  }

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return getYouTubeEmbedUrl(url)
    }
    if (url.includes('vimeo.com')) {
      return getVimeoEmbedUrl(url)
    }
    return null
  }

  if (block.url) {
    const embedUrl = getEmbedUrl(block.url)
    if (embedUrl) {
      return (
        <Container className="py-8 bg-white">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={block.caption || 'Video'}
            />
          </div>
          {block.caption && (
            <p className="mt-2 text-sm text-gray-600 text-center italic">
              {block.caption}
            </p>
          )}
        </Container>
      )
    }
  }

  if (block.videoFile) {
    // For uploaded video files, you would need to get the URL from Sanity
    // This is a placeholder - you'll need to implement file URL retrieval
    return (
      <Container className="py-8 bg-white">
        <div className="text-center text-gray-500">
          Video file support coming soon
        </div>
      </Container>
    )
  }

  return null
}

