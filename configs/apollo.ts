import Context from '~/interfaces/context'

export default ({ $config, env }: Context) => ({
  httpEndpoint: `https://graphql.contentful.com/content/v1/spaces/${env.NUXT_ENV_CONTENTFUL_SPACE_ID}` +
    `/environments/${$config.contentfulEnvironment}`,
  httpLinkOptions: {
    headers: {
      Authorization: `Bearer ${env.NUXT_ENV_CONTENTFUL_ACCESS_TOKEN}`
    }
  }
})