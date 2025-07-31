import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Arjun:424342@e.gsjzwxo.mongodb.net/food-del");
        console.log("database connected");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};