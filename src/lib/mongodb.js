import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
    throw new Error("MONGODB_URL not defined");
}

export default async function connectDB(){
    await mongoose.connect(MONGODB_URI);
    console.log("DB is connected");
}