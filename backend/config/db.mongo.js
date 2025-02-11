const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGO_CLOUD;


const ConnectDB=async()=>{
    try {
        await mongoose.connect(URI);
        console.log("MongoDB Connected.....");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};
module.exports=ConnectDB;