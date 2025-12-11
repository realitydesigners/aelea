import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'collageBlock',
  title: 'Collage Block',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
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
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 3,
      description: 'How many columns to show in the collage on desktop',
    }),
    defineField({
      name: 'gap',
      title: 'Gap Between Images',
      type: 'string',
      options: {
        list: [
          { title: 'Tight', value: 'tight' },
          { title: 'Comfortable', value: 'comfy' },
          { title: 'Roomy', value: 'roomy' },
        ],
      },
      initialValue: 'comfy',
    }),
  ],
  preview: {
    select: {
      images: 'images',
      columns: 'columns',
    },
    prepare({ images, columns }) {
      const count = images?.length || 0
      return {
        title: `Collage (${count} image${count === 1 ? '' : 's'})`,
        subtitle: `${columns || 3} column layout`,
      }
    },
  },
})


