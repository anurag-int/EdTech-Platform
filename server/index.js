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
cloudinaryConnect();

const connect = require('./config/database');
database.connect();

require("dotenv").config();

const PORT = 4000 || process.env.PORT;

//middleware
app.use(express.json());

// cookie-parser is a middleware which parses cookies attached to the client request object. To use it, we will require it in our index. js file; this can be used the same way as we use other middleware.
app.use(cookieParser());

//cors --> used to share resoure from the another origin
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)


//temp path pending

//routes
app.use("api/v1/auth", userRoutes);
app.use("api/v1/profile", profileRoutes);
app.use("api/v1/payment", paymentRoutes);
app.use("api/v1/course", courseRoutes);

//default route(Home)
app.get("/", (req, res) => {
    return res.json({
        success : true,
        message : "Your Server is up and Running"
    })
})

// listining
app.listen(PORT, () => {
    console.log(`App is running in ${PORT}`);
})



app.get("/", (req, res)=>{
    res.send("Welcome to the home Page");
})

app.listen(PORT,()=>{
    console.log(`Server Started on Port ${PORT}`);
});