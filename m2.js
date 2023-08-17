import { connect } from 'amqplib/callback_api.js'


connect('amqp://localhost', function(err0, conn) {
  if (err0) throw err0


  conn.createChannel(function(err1, channel) {
    if (err1) throw err1

    const requestQueue = 'square_root'

    channel.assertQueue(requestQueue, { durable: false })

    channel.prefetch(1)

    console.log(` Waiting messages on ${requestQueue} to compure root`)

    channel.consume(requestQueue, function(msg) {
      const n = parseInt(msg.content.toString())

      const result = Math.sqrt(n)
      console.log(` Square root of ${n} is ${result}`)

      channel.sendToQueue(
        msg.properties.replyTo, Buffer.from(result.toString()), {
        correlationId: msg.properties.correlationId
      })

      channel.ack(msg)

    })
  })
})
