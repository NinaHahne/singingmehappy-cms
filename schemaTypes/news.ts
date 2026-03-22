import {defineArrayMember, defineField, defineType} from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'Aktuelles',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      description: 'Freitext mit optionalen Links',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }).required(),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '📰 Text auf der Aktuelles-Seite',
      }
    },
  },
})
