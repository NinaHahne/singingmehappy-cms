import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalte')
    .items([
      S.listItem().title('Aktuelles 📰').id('news').child(
        S.document().schemaType('news').documentId('news'), // 🔥 FIXED ID = Singleton
      ),

      // alle anderen Dokumenttypen normal darunter:
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'news'),
    ])
