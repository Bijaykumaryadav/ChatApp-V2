const mongoose = require("mongoose");

require("dotenv").config();


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{ 
        dbName: "ChatApp", 
        });
        console.log("Successfully Connected to the database");
    }catch(error){
        console.log("Error in Connecting the database",error);
    }
}

module.exports = dbConnection;