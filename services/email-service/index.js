import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "email-service",
    brokers: ["localhost:9094"]
});

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: "email-service"});

const run = async () => {
    try {
        await producer.connect()
        await consumer.connect()
        await consumer.subscribe({
            topic: "order-successful",
            fromBeginning: true
        });

        await consumer.run ({
            eachMessage: async ({ toipc, partition, message}) => {
                const value = message.value.toString()
                const { userId, orderId } = JSON.parse(value)

                // TODO: send email to the user
                const dummyEmailId = "0234567"
                console.log(`Email consumer: Email send to user id ${userId}`)

                await producer.send({
                    topic: "Email successful",
                    messages: [{
                        value: JSON.stringify({userId, emailId: dummyEmailId})
                    }]
                })
            }
        })

    } catch (err) {
        console.log(err)
    }
}

run();