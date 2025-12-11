import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'imageTextBlock',
  title: 'Image + Text Block',
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
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Image Left, Text Right', value: 'imageLeft' },
          { title: 'Image Right, Text Left', value: 'imageRight' },
          { title: 'Image Top, Text Bottom', value: 'imageTop' },
          { title: 'Image Bottom, Text Top', value: 'imageBottom' },
        ],
      },
      initialValue: 'imageLeft',
    }),
    defineField({
      name: 'linkedPost',
      title: 'Linked Post (optional)',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'Pick a post to open when the image/text is clicked',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => !parent?.linkedPost,
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
      description: 'Choose which font to use for the text',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      text: 'text',
    },
    prepare({ media, text }) {
      const block = text?.[0]
      const textContent = block?.children?.[0]?.text || 'No text'
      return {
        title: 'Image + Text Block',
        subtitle: textContent.substring(0, 50) + (textContent.length > 50 ? '...' : ''),
        media,
      }
    },
  },
})

