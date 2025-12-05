import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule: any) => Rule.uri({
                      allowRelative: true,
                      scheme: ['http', 'https', 'mailto', 'tel'],
                    }),
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'fontFamily',
      title: 'Font Family',
      type: 'string',
      options: {
        list: [
          { title: 'Didot (Serif)', value: 'didot' },
          { title: 'Brandon (Sans-serif)', value: 'brandon' },
          { title: 'Assistant (Light)', value: 'assistant' },
          { title: 'System Default', value: 'system' },
        ],
      },
      initialValue: 'didot',
      description: 'Choose which font to use for this text block',
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing / Container',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width (No Padding)', value: 'full' },
          { title: 'Container (Centered with Padding)', value: 'container' },
          { title: 'Small Padding (32px)', value: 'small' },
          { title: 'Medium Padding (64px)', value: 'medium' },
          { title: 'Large Padding (96px)', value: 'large' },
          { title: 'Extra Large Padding (128px)', value: 'xl' },
          { title: '2XL Padding (160px)', value: '2xl' },
          { title: '3XL Padding (192px)', value: '3xl' },
          { title: 'Custom Padding', value: 'custom' },
        ],
      },
      initialValue: 'container',
      description: 'Choose the spacing/container style for this text block',
    }),
    defineField({
      name: 'customPadding',
      title: 'Custom Padding (px)',
      type: 'number',
      description: 'Enter custom padding in pixels (e.g., 200 for 200px padding on each side)',
      hidden: ({ parent }) => parent?.spacing !== 'custom',
      validation: (Rule) => Rule.min(0).max(1000),
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      const block = content?.[0]
      const text = block?.children?.[0]?.text || 'No content'
      return {
        title: 'Text Block',
        subtitle: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      }
    },
  },
})

