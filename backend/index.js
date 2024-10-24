const express = require("express");
const app = express();
require("dotenv").config();
const dbConnection = require("./config/db");
const port = process.env.PORT || 8000;

// for routes to accept the json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


dbConnection();

app.use("/api/v1",require("./routes"));


app.listen(port,() => {
    console.log("Server is running on the port",port);
})