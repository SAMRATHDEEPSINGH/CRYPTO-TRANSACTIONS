import axios from "axios";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { Transaction } from "../models/Transaction.modal.js";

const createTransaction=asyncHandler(async(req,res)=>{
    const {address}=req.body;
    if (!address) {
        return new ApiError(400,"Please provide an address");
    }

    const response=await axios.get(`https://api.etherscan.io/api`,{
        params:{
            module:'account',
            action:'txlist',
            address:address,
            startblock:0,
            endblock:99999999,
            sort:'asc',
            apikey:process.env.ETHERSCAN_API_KEY,
        }
    });

    if (!response.data.result) {
        return new ApiError(400,"No transactions found");
    }

    const transaction=response.data.result;

    if (transaction.length===0) {
        return new ApiError(400,"No transactions found");
    }

    const newTransaction=await Transaction.insertMany(transaction);

    if (!newTransaction.length) {
        return new ApiError(500,"Could not Save Transaction");
    }

    console.log(newTransaction);

    return res.status(201).json(
        new ApiResponse(200,newTransaction,"Transactions created successfully")
    );

})

export{
    createTransaction
}