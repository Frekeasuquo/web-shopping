import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());

app.post("/payment-service", async (req,res) => {
    const {cart} = req.body
    // Assume that we get the cookie and decrypt the user ID

    const userId = '123'

    // Todo: Payment
    console.log("Api endpoint hit")
    // Kafka

    return res.status(200).send("Payment Successful")
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
});

app.listen(8000, () => {
    console.log("Payment is running on port 8000")
});

