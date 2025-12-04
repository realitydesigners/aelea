import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'spacerBlock',
  title: 'Spacer Block',
  type: 'object',
  fields: [
    defineField({
      name: 'height',
      title: 'Spacing Height',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Extra Large', value: 'xlarge' },
        ],
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      height: 'height',
    },
    prepare({ height }) {
      return {
        title: 'Spacer Block',
        subtitle: `Height: ${height || 'medium'}`,
      }
    },
  },
})

