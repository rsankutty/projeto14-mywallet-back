import express from "express"
import cors from 'cors';
import authRouter from "./routes/AuthRoutes.js";
import cashFlowRouter from "./routes/CashFlowRoutes.js";

// Server configs
const PORT = 5000
const server = express()

server.use(express.json());
server.use(cors());
server.use([authRouter, cashFlowRouter]);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
