import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        { type: 'imageBlock' },
        { type: 'textBlock' },
        { type: 'imageTextBlock' },
        { type: 'headingBlock' },
        { type: 'imageGalleryBlock' },
        { type: 'videoBlock' },
        { type: 'spacerBlock' },
        { type: 'imageSliderBlock' },
        { type: 'buttonBlock' },
        { type: 'socialLinksBlock' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          description: 'Title for search engines (defaults to page title)',
        }),
        defineField({
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          description: 'Description for search engines',
        }),
        defineField({
          name: 'image',
          title: 'SEO Image',
          type: 'image',
          description: 'Image for social sharing',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled',
        subtitle: slug ? `/${slug}` : 'No slug',
      }
    },
  },
})

