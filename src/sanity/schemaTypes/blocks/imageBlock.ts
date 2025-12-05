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
    defineField({
      name: 'overlayText',
      title: 'Text Overlay',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Optional text to display on top of the image',
    }),
    defineField({
      name: 'overlayPosition',
      title: 'Text Overlay Position',
      type: 'string',
      options: {
        list: [
          { title: 'Top Left', value: 'top-left' },
          { title: 'Top Center', value: 'top-center' },
          { title: 'Top Right', value: 'top-right' },
          { title: 'Center Left', value: 'center-left' },
          { title: 'Center', value: 'center' },
          { title: 'Center Right', value: 'center-right' },
          { title: 'Bottom Left', value: 'bottom-left' },
          { title: 'Bottom Center', value: 'bottom-center' },
          { title: 'Bottom Right', value: 'bottom-right' },
        ],
      },
      initialValue: 'center',
      description: 'Position of the text overlay on the image',
      hidden: ({ parent }) => !parent?.overlayText || parent.overlayText.length === 0,
    }),
    defineField({
      name: 'overlayTextColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Black', value: 'black' },
          { title: 'Light Gray', value: 'gray-300' },
          { title: 'Dark Gray', value: 'gray-700' },
        ],
      },
      initialValue: 'white',
      description: 'Color of the overlay text',
      hidden: ({ parent }) => !parent?.overlayText || parent.overlayText.length === 0,
    }),
    defineField({
      name: 'overlayBackground',
      title: 'Background Overlay',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Dark (Semi-transparent)', value: 'dark' },
          { title: 'Light (Semi-transparent)', value: 'light' },
        ],
      },
      initialValue: 'none',
      description: 'Optional background behind the text for better readability',
      hidden: ({ parent }) => !parent?.overlayText || parent.overlayText.length === 0,
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

