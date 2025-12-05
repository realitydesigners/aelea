import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this navigation item',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Text displayed in the navigation menu',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Page', value: 'page' },
          { title: 'External URL', value: 'external' },
          { title: 'No Link (Dropdown Only)', value: 'none' },
        ],
      },
      initialValue: 'page',
      description: 'Choose how this navigation item links',
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Select a page to link to',
      hidden: ({ parent }) => parent?.linkType !== 'page',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'External URL to link to',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'children',
      title: 'Sub-Pages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{ type: 'page' }],
              validation: (Rule) => Rule.required(),
              description: 'Select the page this sub-item links to',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              pageTitle: 'page.title',
            },
            prepare({ title, pageTitle }) {
              return {
                title: title || 'Untitled',
                subtitle: pageTitle ? `→ ${pageTitle}` : 'No page selected',
              }
            },
          },
        },
      ],
      description: 'Sub-pages that appear in the dropdown menu',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which this item appears (lower numbers first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      pageTitle: 'page.title',
      childrenCount: 'children',
    },
    prepare({ title, linkType, pageTitle, childrenCount }) {
      const childrenText = childrenCount?.length > 0 ? ` (${childrenCount.length} sub-pages)` : ''
      const linkText = linkType === 'page' && pageTitle ? `→ ${pageTitle}` : linkType === 'external' ? '→ External' : '→ No link'
      return {
        title: title || 'Untitled',
        subtitle: `${linkText}${childrenText}`,
      }
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})

