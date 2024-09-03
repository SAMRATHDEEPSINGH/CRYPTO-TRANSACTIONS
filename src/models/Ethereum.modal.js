import mongoose,{Schema} from "mongoose";

const EthereumSchema = new Schema({
    price:{
        type:Number,
        required:true
    }
},{timestamps:true});

export const Ethereum=mongoose.model("Ethereum",EthereumSchema);

