import { connect } from 'amqplib/callback_api.js'
import express from 'express'

const app = express()

const port = 3000

app.get('/', (req, res) => {
  connect('amqp://localhost', (err0, connection) => {
    if (err0) throw err0

    connection.createChannel((err1, channel) => {
      if (err1) throw err1

      channel.assertQueue('', { exclusive: true }, (err2, responseQueue) => {
        if (err2) throw err2

        // Each request will have a unique correlationId
        // so that responses won't be mixed up
        const correlationID = Math.floor(Math.random() * 10000).toString()
        const num = parseInt(req.query.num)

        // M1 is waiting for a response from responseQueue
        channel.consume(responseQueue.queue, (msg) => {

          if (msg.properties.correlationId === correlationID) {

            const result = msg.content.toString()
            res.send(` Square root of ${num} is ${result}`)
          }

        }, { noAck: true })

        console.log(` Requesting square root of ${num}`)

        const requestQueue = 'square_root'

        channel.sendToQueue(requestQueue,
          Buffer.from(num.toString()),
          {
            correlationId: correlationID,
            replyTo: responseQueue.queue
          })

      })
    })
  })

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

