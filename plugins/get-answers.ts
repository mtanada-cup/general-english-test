import getAnswers from '~/graphql/queries/data/get-answers.gql'

export default async({ app, store }: any) => {
  const client = app.apolloProvider.defaultClient

  try {
    const answersResponse = await client.query({ 
      query: getAnswers,
      variables: { type: 'English' }
    })

    const answers = answersResponse.data.answersCollection.items
    store.dispatch('setAnswers', answers)

  } catch(e) {
    console.log(e)
  }
}