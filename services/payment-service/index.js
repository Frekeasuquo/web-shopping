import express from 'express'
import cors from 'cors'
import { Kafka } from "kafkajs";

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());

const kafka = new Kafka({
    clientId: "payment-service",
    brokers: ["localhost:9094"]
});

const producer = kafka.producer();

const connectToKafka = async () => {
    try {
        await producer.connect();
        console.log("Producer connected!")
    } catch (error) {
        console.log("Error connecting to Kafka",error)
    }
}

app.post("/payment-service", async (req,res) => {
    const {cart} = req.body
    // Assume that we get the cookie and decrypt the user ID

    const userId = '123'

    // Todo: Payment
    console.log("Api endpoint hit")
    // Kafka
    await producer.send({
        topic: "payment-succeessful",
        messages: [{value: JSON.stringify({cart, userId})}]
    })

    return res.status(200).send("Payment Successful")
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
});

app.listen(8000, () => {
    connectToKafka() 
    console.log("Payment is running on port 8000")
});

