import mongoose from "mongoose";
import {configDotenv} from "dotenv";

configDotenv();

export default async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database is connected: ', conn.connection.host);
    } catch (error) {
        console.log("Error: ", error.message);
    }
}