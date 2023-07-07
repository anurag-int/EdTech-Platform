const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const userRoutes = require("./routes/User");

const connect = require('./config/database');

const cloudinaryConnect = require("./config/");
const PORT = 4000 || process.env.PORT;


app.get("/", (req, res)=>{
    res.send("Welcome to the home Page");
})

app.listen(PORT,()=>{
    console.log(`Server Started on Port ${PORT}`);
});