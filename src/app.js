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
        res.status(400).send("error saving the message"+err.message);
    }


});

//getting user data with matched email
app.get("/user", async(req,res)=>{
const userEmail=req.body.email;

try{
    const users=await m1.find({email:userEmail});// it will send array of user with that email
    if(users.length===0)
        res.status(404).send("user not found");

    res.send(users);
}
catch(err)
{
    res.status(400).send("something went wrong");
}
});

app.get("/allUser",async(req,res)=>{
    
    const allUser=await m1.find({});
    res.send(allUser);
})
app.delete("/deleteUser",async(req,res)=>{
    const userID=req.body.id;
    try{
  const user= await m1.findByIdAndDelete(userID);
  if(!user)
    res.send("user not found");
  res.send("user deleted Scucessfully");
    }
    catch(err){
        res.status(404).send("somenthing went wrong");
    }
})
app.patch("/updateUser",async(req,res)=>
{
    const id=req.body.id;
    try{
    const updatedUser=await m1.findByIdAndUpdate(id,req.body,
        {returnDocument:"after",
        runValidators:true,
        });
    
    res.send({ message: "Updated successfully", user: updatedUser });

    }
    catch(err)
    {
        res.status(400).send("update failed"+err.message);
    }
    
}

)

connectDB().then(()=>{
    console.log("database connected successfully");

    app.listen(7777,()=>{
        console.log("server is running suceesfully");
    });
}).catch((err)=>{
    console.log("database not conected",err);
})