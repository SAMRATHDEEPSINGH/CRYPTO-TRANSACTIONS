import express from 'express';
import transactionRoutes from './routes/transaction.routes.js';

const app = express();

app.use(express.json());


app.use('/api/v1/transactions',transactionRoutes);

export {app}
