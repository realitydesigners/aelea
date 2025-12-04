import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'imageSliderBlock',
  title: 'Image Slider Block',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
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
        },
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: true,
      description: 'Automatically change images',
    }),
    defineField({
      name: 'autoplaySpeed',
      title: 'Autoplay Speed (seconds)',
      type: 'number',
      initialValue: 2,
      description: 'Time in seconds before switching to next image',
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'showDots',
      title: 'Show Navigation Dots',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showArrows',
      title: 'Show Navigation Arrows',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      images: 'images',
      autoplay: 'autoplay',
    },
    prepare({ images, autoplay }) {
      const count = images?.length || 0
      return {
        title: `Image Slider (${count} image${count !== 1 ? 's' : ''})`,
        subtitle: autoplay ? 'Autoplay enabled' : 'Autoplay disabled',
      }
    },
  },
})

