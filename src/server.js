import express from "express"
import router from './routes/routes.js';

// Server configs
const PORT = 5000
const server = express()

server.use(express.json());
server.use(router);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
