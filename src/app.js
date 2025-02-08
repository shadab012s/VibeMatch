// creating the server
const express=require("express");
const app=express();
const connectDB=require("./config/database");
const m1 =require("./models/user"); // importing model

app.use(express.json()); //middleware


//taking data from api
app.post("/signup",async (req,res)=>{
    // const userObj={
    //     firsrname:"dhoni",
    //     lastname:"mahi",
    //     email:"@gdhomail.com",
    //     age:23,
    //     heekk:"hhhh",
    // }

    //creating dynamic instace of m1 model taking data from post api call
    const user= new m1(req.body); //passing object into model
    try{
    await user.save();
    res.send("user added sucessfully");
    }
    catch(err){
        res.status(400).send("error saving the message");
    }


})

connectDB().then(()=>{
    console.log("database connected successfully");
    app.listen(7777,()=>{
        console.log("server is running suceesfully");
    });
}).catch((err)=>{
    console.log("database not conected",err);
})