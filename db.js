const mongoose = require("mongoose");

const mongoURI ="mongodb://127.0.0.1:27017/ecome"

const connectToMongo = async()=>{
   await mongoose.connect(mongoURI);
   console.log("connected to mongodb successfuly")
}

module.exports = connectToMongo;