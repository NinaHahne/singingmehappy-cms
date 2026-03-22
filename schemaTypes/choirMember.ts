import {defineField, defineType} from 'sanity'

const VOICE_OPTIONS = [
  {title: 'Sopran', value: 'sopran'},
  {title: 'Mezzo', value: 'mezzo'},
  {title: 'Alt', value: 'alt'},
  {title: 'Tenor', value: 'tenor'},
  {title: 'Bariton / Bass', value: 'bariton-bass'},
]

export const choirMemberType = defineType({
  name: 'choirMember',
  title: 'Chormitglied 😄',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Der Name des Mitglieds (z. B. "Brit").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'voiceType',
      title: 'Stimmgruppe',
      type: 'string',
      description:
        'Wählt die Stimmgruppe (z. B. Sopran, Alt etc.). Diese wird verwendet, um die Person auf der Webseite in die richtige Gruppe einzuordnen.',
      options: {
        list: VOICE_OPTIONS,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Untertitel',
      type: 'string',
      description:
        'Kurzer Zusatz unter dem Namen (z. B. "Sopran" oder "Mezzo / Alt"). Wird direkt unter dem Namen angezeigt.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Persönlicher Text',
      type: 'text',
      rows: 3,
      description:
        'Optionaler kurzer Text über die Person (z. B. Hobbies oder ein Motto). Wird unter dem Namen angezeigt. Textumbrüche werden berücksichtigt.',
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      description:
        'Ein Foto der Person ⚠️ Bitte Bilder möglichst unter 2 MB hochladen (maximal 5 MB) ⚠️',
      options: {
        hotspot: true,
        metadata: ['image', 'lqip', 'palette', 'blurhash'],
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Bildbeschreibung (Alt-Text)',
          type: 'string',
          description:
            'Kurze Beschreibung des Bildes (z. B. "Brit – Sopran"). Wird für Barrierefreiheit und SEO verwendet.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Reihenfolge',
      type: 'number',
      description:
        'Bestimmt die Reihenfolge innerhalb der Stimmgruppe. Kleinere Zahlen erscheinen weiter vorne/oben (z. B. 1, 2, 3).',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subtitle',
      media: 'image',
      voiceType: 'voiceType',
      sortOrder: 'sortOrder',
    },
    prepare({title, subtitle, media, voiceType, sortOrder}) {
      return {
        title,
        subtitle: ` ${voiceType?.toUpperCase()} · ${sortOrder}`,
        media: media || '😄',
      }
    },
  },
})
