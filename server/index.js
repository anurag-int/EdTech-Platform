const express = require("express");
const app = express();

const connect = require('./config/database');

app.get("/", (req, res)=>{
    res.send("Welcome to the home Page");
})

app.listen(3000,()=>{
    console.log("Server Started on Port 3000");
})