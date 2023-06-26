const mongoose = require("mongoose");

require("dotenv").config;
exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully Connected with MongoDB");
    })
    .catch((err) => {
      console.log("Not Connected....")
      console.log(err);
    });
};
