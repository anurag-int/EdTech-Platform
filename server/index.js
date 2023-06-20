const express = require("express");
const app = express();
const PORT = 4000 || process.env.PORT;
const connect = require('./config/database');

app.get("/", (req, res)=>{
    res.send("Welcome to the home Page");
})

app.listen(PORT,()=>{
    console.log(`Server Started on Port ${PORT}`);
})