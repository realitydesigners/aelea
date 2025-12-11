import { StructureBuilder } from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      S.listItem()
        .title('Posts')
        .child(
          S.documentTypeList('post')
            .title('Posts')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Navigation')
        .child(
          S.documentTypeList('navigation')
            .title('Navigation')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
    ])
}

