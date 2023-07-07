const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const userRoutes = require("./routes/User");

const {cloudinaryConnect} = require("./config/cloudinary");
const connect = require('./config/database');

require("dotenv").config();

const PORT = 4000 || process.env.PORT;



app.get("/", (req, res)=>{
    res.send("Welcome to the home Page");
})

app.listen(PORT,()=>{
    console.log(`Server Started on Port ${PORT}`);
});