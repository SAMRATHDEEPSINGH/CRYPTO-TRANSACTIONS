import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";


const connectDB = async () => {
    try{
        if (!process.env.MONGODB_URI || !DB_NAME) {
            throw new Error("Missing MONGO DB URI or DB NAME");
        }
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
        // console.log(`\n MongoDB Connected: ${connectionInstance.connection.host}`);
    }
    catch(error){
        // console.log("MONGO connection FAILED",error.message);
        process.exit(1);
    }
};

export default connectDB;
