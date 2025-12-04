import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'buttonBlock',
  title: 'Button Block',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'URL or page path (e.g., /contact, https://example.com)',
      validation: (Rule) => Rule.required(),
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
      name: 'variant',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Blue)', value: 'primary' },
          { title: 'Secondary (Teal)', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
      description: 'Open link in a new browser tab',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      link: 'link',
      alignment: 'alignment',
    },
    prepare({ text, link, alignment }) {
      return {
        title: text || 'Button',
        subtitle: `${link || 'No link'} • ${alignment || 'center'}`,
      }
    },
  },
})

