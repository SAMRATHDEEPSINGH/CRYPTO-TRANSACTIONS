# Crypto Transaction Fetcher

This project is a Node.js server-side application that fetches and processes cryptocurrency transactions for a user. It leverages the Etherscan API to retrieve Ethereum transactions and the CoinGecko API to fetch the current Ethereum price. The data is stored in a MongoDB database, and the application is designed to provide users with their total expenses and the current price of Ethereum.

## Features

- Fetches normal Ethereum transactions for a given address using the Etherscan API.
- Stores the transactions in a MongoDB database.
- Periodically fetches and stores the current Ethereum price using the CoinGecko API.
- Provides a `GET` API to return the user's total expenses and the current Ethereum price.

## Prerequisites

- Node.js (v14+)
- MongoDB Atlas account (or local MongoDB instance)
- Etherscan API Key
- AWS Account (for deployment)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-transaction-fetcher.git
   cd crypto-transaction-fetcher

2. Install dependencies:

npm install

3. Set up environment variables:

Create a .env file in the root directory and add the following:

PORT=3000
MONGO_URI=your_mongodb_connection_string
ETHERSCAN_API_KEY=your_etherscan_api_key

4. Run the application:

npm start

5. The server will be running on http://localhost:3000.

API Endpoints
1. Fetch Transactions
POST /api/transactions/:address

Fetches and stores Ethereum transactions for the specified address.
Example: POST /api/v1/transactions/0xce94e5621a5f7068253c42558c147480f38b5e0d
2. Get User Expenses and Current Ethereum Price
GET /api/expenses/:address

Retrieves the user's total expenses and the current Ethereum price.
Example: GET /api/v1/transactions/expenses/0xce94e5621a5f7068253c42558c147480f38b5e0d



Deploying MongoDB on MongoDB Atlas

Create a MongoDB Atlas account.

Create a new cluster and configure it.

Whitelist your IP and create a database user.

Connect your application using the connection string provided by Atlas.

Optional
Automated Deployment: Set up CI/CD using GitHub Actions or another CI/CD tool to automatically deploy to AWS.
Monitoring: Use AWS CloudWatch for monitoring and logging.


Acknowledgments
Etherscan API

CoinGecko API


MongoDB Atlas

### **Usage Instructions**
- **How to Use**: Detailed steps to run the project locally.
- **API Documentation**: Details of the API endpoints available in the project.
- **License**: Licensing information for the project.

### **Customization**
- Replace the placeholder URLs, API keys, and connection strings with your actual values.
- Add or remove sections based on your specific implementation and features.

