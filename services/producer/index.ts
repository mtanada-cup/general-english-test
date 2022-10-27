const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:3000']
})

const producer = kafka.producer()

const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'trn_mtanada_webpageviews',
    messages: [
      { value: 'Test mtanada topic.' },
    ],
  })
}

run().catch(console.error)