 const mongoose=require("mongoose");
const {Schema}=mongoose;
const userSchema= new Schema({
    firsrname:String,
    lastname:String,
    age:Number,
    email:String,
    phoneNumber:Number,

});
// model
const userModel=mongoose.model("m1",userSchema);
module.exports=userModel;