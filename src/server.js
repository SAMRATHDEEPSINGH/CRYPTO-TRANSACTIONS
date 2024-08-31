import dotenv from 'dotenv';
import connectDB from './db/databaseconnect.js';
import { app } from './app.js';

dotenv.config({
    path: './.env'
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is Running on Port: ${process.env.PORT}`);
    })
})

.catch((error)=>{
    console.log("MONGODB connection FAILED",error);
})