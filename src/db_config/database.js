import dotenv from "dotenv"
import { MongoClient } from "mongodb"

dotenv.config()

// Mongo configs
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
    await mongoClient.connect();
    db = mongoClient.db();
    console.log("Successfully connected to the database");
} catch (err) {
    console.log(err.message);
}

export default db