const express = require("express");
const app = express();
const port = 8000;

app.get("/",(req,res ) => {
    res.send("Hello World");
})

app.use("/api/v1",require("./routes"));

app.listen(port,() => {
    console.log("Server is running on the port",port);
})