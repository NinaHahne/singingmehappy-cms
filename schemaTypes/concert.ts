import {defineArrayMember, defineField, defineType} from 'sanity'

export const concertType = defineType({
  name: 'concert',
  title: 'Konzert ♫',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      description: 'Datum im Format JJJJ-MM-TT (z. B. 2026-12-31)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timeLabel',
      title: 'Uhrzeit (Anzeige)',
      type: 'string',
      description: 'Optional, z. B. „19:00 Uhr“ oder „Einlass ab 18:30“',
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Optionaler Titel für das Konzert (z. B. „Jubiläumskonzert“)',
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'array',
      description: 'Freitext mit optionalen Links (z. B. Infos zum Programm)',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
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
                      }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Ort / Adresse',
      type: 'text',
      rows: 4,
      description: 'Mehrzeiliges Feld für Veranstaltungsort und Adresse.',
    }),
    defineField({
      name: 'mapsUrl',
      title: 'Karten-Link',
      type: 'url',
      description: 'Optionaler Link zu Google Maps oder OpenStreetMap',
    }),
    defineField({
      name: 'links',
      title: 'Externe Links',
      type: 'array',
      description: 'z. B. Ticketverkauf, Veranstaltungsseite etc.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Linktext',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'flyerImage',
      title: 'Flyer / Bild',
      type: 'image',
      description:
        'Optionales Bild, z. B. Konzertflyer. ⚠️ Bitte Bilder möglichst unter 2 MB hochladen (maximal 5 MB) ⚠️',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativtext',
          type: 'string',
          description: 'Kurze Beschreibung des Bildes (für Barrierefreiheit)',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      location: 'location',
      timeLabel: 'timeLabel',
      flyerImage: 'flyerImage',
    },
    prepare({title, date, location, timeLabel, flyerImage}) {
      const firstLocationLine = location?.split('\n')?.[0]
      const subtitleParts = [date, timeLabel, firstLocationLine].filter(Boolean)

      return {
        title: title || 'Konzert ohne Titel',
        subtitle: subtitleParts.join(' · '),
        media: flyerImage || '♫',
      }
    },
  },
})
