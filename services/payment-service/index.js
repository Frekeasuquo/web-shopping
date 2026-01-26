import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: "http://localhost/3000"
}));

app.use(express.json());

app.post("/payment-service", async (req,res) => {
    
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
});

app.listen(8000, () => {
    console.log("Payment is running on port 8000")
});

