declare module '*.gql' {
  import { DocumentNode } from 'graphql'

  const content: DocumentNode
  export default content
}

declare module 'contentful-rich-text-vue-renderer'