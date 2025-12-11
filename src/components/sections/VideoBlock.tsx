import { VideoBlock as VideoBlockType } from '@/lib/types'
import Container from '../ui/Container'

export default function VideoBlock({ block }: { block: VideoBlockType }) {
  const sizeClasses = {
    xs: 'max-w-[200px]',
    sm: 'max-w-[300px]',
    md: 'max-w-[500px]',
    lg: 'max-w-[700px]',
    xl: 'max-w-[900px]',
    full: 'w-full',
  }

  const size = block.size || 'md'
  const sizeClass = sizeClasses[size]

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
          <div className="flex justify-center">
            <div className={`relative w-full ${sizeClass} aspect-video rounded-lg overflow-hidden`}>
              <iframe
                src={embedUrl}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={block.caption || 'Video'}
              />
            </div>
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

  if (block.videoFile?.asset?.url) {
    const videoUrl = block.videoFile.asset.url
    return (
      <Container className="py-8 bg-white">
        <div className="flex justify-center">
          <div className={`relative w-full ${sizeClass} aspect-video rounded-lg overflow-hidden`}>
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover"
              autoPlay={block.autoplay || false}
              loop
              muted={block.autoplay || false}
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        {block.caption && (
          <p className="mt-2 text-sm text-gray-600 text-center italic">
            {block.caption}
          </p>
        )}
      </Container>
    )
  }

  return null
}

