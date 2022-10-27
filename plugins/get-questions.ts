import getQuestions from '~/graphql/queries/data/get-questions.gql'

export default async({ app, store }: any) => {
  const client = app.apolloProvider.defaultClient

  try {
    const questionsResponse = await client.query({ query: getQuestions })

    const questions = questionsResponse.data.questionsCollection.items
    store.dispatch('setQuestions', questions)

  } catch(e) {
    console.log(e)
  }
}