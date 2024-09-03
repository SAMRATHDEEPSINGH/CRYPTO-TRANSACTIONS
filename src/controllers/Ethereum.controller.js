import axios from "axios";
import {ApiResponse} from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Ethereum } from "../models/Ethereum.modal.js";

const fetchEthereumPrice=async()=>{
    try{
    const response=await axios.get(`https://api.coingecko.com/api/v3/simple/price`,{
        params:{
            ids:'ethereum',
            vs_currencies:'inr',
        }
    });

    if (!response.data.ethereum) {
        return new ApiError(400,"No ethereum price found");
    }

    const price=response.data.ethereum.inr;

    if (!price) {
        return new ApiError(400,"No ethereum price found");
    }


    const newEthereum=await Ethereum.create({price});

    if (!newEthereum) {
        return new ApiError(500,"Could not Save Ethereum");
    }   

    

    return { message: "Ethereum price fetched and saved successfully",data:newEthereum};


}catch(error){
    console.error('Error fetching Ethereum price:', error);
}
};

export {
     fetchEthereumPrice
}