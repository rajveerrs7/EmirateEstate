import mongoose from "mongoose";

export default async function dbConnect() {
    if(mongoose.connection.readyState >= 1){
        console.log("Already connected to database");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        console.log("connected to database")
    } catch (error) {
        console.error("Error connecting to database", error);
    }
}