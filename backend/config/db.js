const mongoose = require("mongoose");

const dotenv = require("dotenv").config();


const dbConnection = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully Connected to the database");
    }catch(error){
        console.log("Error in Connecting the database",error);
    }
}

module.exports = dbConnection;