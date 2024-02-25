import mongoose from "mongoose";
import {MONGODB_URI} from "./config/config.js";

export async function connectDB() {
    try {
        const db = await mongoose.connect(MONGODB_URI)
        console.log('Connected to', db.connection.name)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}
