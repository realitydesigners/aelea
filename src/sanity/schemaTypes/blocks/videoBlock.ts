import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or other video URL',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload a video file (alternative to URL)',
    }),
    defineField({
      name: 'size',
      title: 'Video Size',
      type: 'string',
      options: {
        list: [
          { title: 'Extra Small (200px)', value: 'xs' },
          { title: 'Small (300px)', value: 'sm' },
          { title: 'Medium (500px)', value: 'md' },
          { title: 'Large (700px)', value: 'lg' },
          { title: 'Extra Large (900px)', value: 'xl' },
          { title: 'Full Width', value: 'full' },
        ],
      },
      initialValue: 'md',
      description: 'Choose the maximum width of the video',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
      description: 'Note: Autoplay may be blocked by browsers',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption',
    },
    prepare({ url, caption }) {
      return {
        title: 'Video Block',
        subtitle: url || caption || 'No video source',
      }
    },
  },
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (!fields?.url && !fields?.videoFile) {
        return 'Either URL or Video File is required'
      }
      return true
    }),
})

