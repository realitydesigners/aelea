import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'socialLinksBlock',
  title: 'Social Links Block',
  type: 'object',
  fields: [
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      description: 'Your Instagram profile URL',
    }),
    defineField({
      name: 'soundcloud',
      title: 'SoundCloud URL',
      type: 'url',
      description: 'Your SoundCloud profile URL',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      description: 'Your Facebook profile URL',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
      description: 'Your YouTube channel URL',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Your email address (will be formatted as mailto: link)',
      validation: (Rule) => Rule.email(),
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
      name: 'size',
      title: 'Icon Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small (40px)', value: 'sm' },
          { title: 'Medium (50px)', value: 'md' },
          { title: 'Large (60px)', value: 'lg' },
        ],
      },
      initialValue: 'md',
    }),
  ],
  preview: {
    select: {
      instagram: 'instagram',
      soundcloud: 'soundcloud',
      facebook: 'facebook',
      youtube: 'youtube',
      email: 'email',
    },
    prepare({ instagram, soundcloud, facebook, youtube, email }) {
      const links = []
      if (instagram) links.push('Instagram')
      if (soundcloud) links.push('SoundCloud')
      if (facebook) links.push('Facebook')
      if (youtube) links.push('YouTube')
      if (email) links.push('Email')
      
      return {
        title: 'Social Links',
        subtitle: links.length > 0 ? links.join(', ') : 'No links configured',
      }
    },
  },
})

