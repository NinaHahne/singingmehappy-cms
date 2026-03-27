import {defineArrayMember, defineField, defineType} from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'Aktuelles',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Kleiner Text links',
      type: 'text',
      rows: 4,
      description:
        'Optionaler kurzer Text unter der Überschrift „Aktuelles“ - maximal 80 Zeichen - Textumbrüche werden berücksichtigt',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      description:
        'Freitext mit optionalen Links. Für ein "geschütztes Leerzeichen" bitte ~ verwenden.',
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
