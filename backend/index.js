const express = require('express');
const cors = require('cors');
require('dotenv').config();
const transactionrouter = require('./routes/transaction.route');
const ConnectDB = require("./config/db.mongo");

const app = express();
const PORT =process.env.PORT || 5000;
ConnectDB();

app.use(cors());
app.use(express.json());



app.use('/api/check', (req, res) => {
    res.status(200).json({ message: "API is Running.." })
})

app.use('/api/transaction',transactionrouter);

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
});