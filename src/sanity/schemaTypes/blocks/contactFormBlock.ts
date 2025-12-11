import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactFormBlock',
  title: 'Contact Form',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional heading shown above the form',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional intro text under the title',
    }),
    defineField({
      name: 'formspreeEndpoint',
      title: 'Formspree Endpoint',
      type: 'url',
      description: 'e.g. https://formspree.io/f/your-id',
      validation: (Rule) => Rule.uri({ allowRelative: false }),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Send',
    }),
    defineField({
      name: 'includeMailingListCheckbox',
      title: 'Include Mailing List Checkbox',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message (optional)',
      type: 'string',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message (optional)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Form',
        subtitle: 'Formspree submission',
      }
    },
  },
})


