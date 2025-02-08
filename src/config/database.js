
require("dotenv").config(); // Load environment variables
const mongoose=require("mongoose");
const connectDB=async()=>{
    await mongoose.connect(process.env.Connection_String);
}
module.exports=connectDB;