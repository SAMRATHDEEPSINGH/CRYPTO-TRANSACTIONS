import axios from "axios";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { Transaction } from "../models/Transaction.modal.js";
import {Ethereum} from "../models/Ethereum.modal.js";

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

    // console.log(newTransaction);

    return res.status(201).json(
        new ApiResponse(200,newTransaction,"Transactions created successfully")
    );

})

const getexpenses=asyncHandler(async(req,res)=>{
    const {address}=req.query;

    if (!address) {
        return new ApiError(400,"Please provide an address");
    }

    const transactions=await Transaction.find({from:address});

    if (!transactions) {
        return new ApiError(400,"No transactions found");
    }

    let totalExpenses=0;
    transactions.forEach(transaction => {
        const gasUsed = parseFloat(transaction.gasUsed);
        const gasPrice = parseFloat(transaction.gasPrice);
        const expense = (gasUsed * gasPrice) / 1e18;
        totalExpenses += expense;
    });

    const latestPrice=await Ethereum.findOne().sort({createdAt:-1});

    if (!latestPrice) {
        return new ApiError(400,"No price found");
    }

    return res.status(200).json(
        new ApiResponse(200,
            [
                {totalExpenses:totalExpenses.toFixed(18)},
                {latestPrice:latestPrice.price}
            ],"Total Expenses calculated successfully and Fetched latest price successfully")
    )
})

export{
    createTransaction,
    getexpenses
}