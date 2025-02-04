// creating the server
const express=require("express");
const app=express();

app.use("/hey",(req,res)=>{
    res.send("hello from server");
});
//using rout
app.use("/post",(req,res)=>{
    res.send("i am post");
});
app.listen(2000,()=>{
    console.log("serever is running successfully, have a good day sir");
});