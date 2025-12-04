import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for accessibility and SEO',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Image Size',
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
      description: 'Choose the maximum width of the image',
    }),
    defineField({
      name: 'borderRadius',
      title: 'Border Radius',
      type: 'string',
      options: {
        list: [
          { title: 'None (Square)', value: 'none' },
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
          { title: 'Full (Circular)', value: 'full' },
        ],
      },
      initialValue: 'md',
      description: 'Choose the border radius style',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'center',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'image.alt',
    },
    prepare({ media, alt }) {
      return {
        title: 'Image Block',
        subtitle: alt || 'No alt text',
        media,
      }
    },
  },
})

