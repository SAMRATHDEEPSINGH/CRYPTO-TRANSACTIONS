import express from 'express';
import transactionRoutes from './routes/transaction.routes.js';
import cron from 'node-cron';
import { fetchEthereumPrice } from './controllers/Ethereum.controller.js';


const app = express();

app.use(express.json());



app.use('/api/v1/transactions',transactionRoutes);

cron.schedule('*/10 * * * *', async()=>{
    console.log('Fetching Ethereum price every 10 minute...');
    try {
      const response= await fetchEthereumPrice();
        console.log(response.data.price);
    } catch (error) {
        console.error('Error fetching Ethereum price:', error);
    }
}); // runs every minute

export {app}
