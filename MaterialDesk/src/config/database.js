import mongoose from "mongoose";

import { MONGO_URI } from "./env.js";

export async function connectDB() {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("mongodb conecter")
    } catch (error){
        console.error("mongodb non conecter", error.message);
        throw error;
    }
}