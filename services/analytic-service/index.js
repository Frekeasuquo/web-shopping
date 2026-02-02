import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "analytic-service",
    brokers: ["localhost:9094"]
});

const consumer = kafka.consumer({ groupId: "analytic-service"});

const run = async () => {
    try {
        await consumer.connect()
        await consumer.subscribe({
            topics: ["payment-successful", "order-successful", "email-successful"],
            fromBeginning: true
        });

        await consumer.run ({
            eachMessage: async ({ toipc, partition, message}) => {
                const value = message.value.toString()
                const { userId, cart } = JSON.parse(value)

                const total = cart.reduce((acc, item) => acc + item.price, 0);

                console.log(`Analytic consumer: User ${userId} paid ${total}`);
            }
        })

    } catch (err) {
        console.log(err)
    }
}

run();