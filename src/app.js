// src/app.js

const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const cookieParser=require("cookie-parser");
const User = require("./models/user"); // Importing User model
const {userAuth}=require("./middlewares/auth")

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cookieParser()); // it is a middleware to parse the cookies, help us to read the cookies

// ✅ Signup Route - Create User
app.post("/signup", async (req, res) => {
    try {
        
        const { firstname, lastname, email, age, password } = req.body;

        // Check if all required fields are provided
        if (!firstname || !email || !age || !password) {
            return res.status(400).send("Missing required fields");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email already registered");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        

        // Create user
        const user = new User({
            firstname,
            lastname,
            email,
            age,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).send("User added successfully");
    } catch (err) {
        res.status(400).send("Error saving the message: " + err.message);
    }
});

app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            throw new Error(" email is not valid");
        }
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid)
        { 
            //create a token 
            const token=await user.getJWT();
            
            console.log(token);
            //add the token to cookies and send the response back to the user
            res.cookie("token",token,{
                expires:new Date(Date.now()+8 *3600000),
            });
            res.send("Login successfull");
        }
        else{
            throw new Error(" password is not correct");
        }
    }
    catch(err)
    {
        res.status(400).send("error in login"+err.message);
    }
})

app.get("/profile",userAuth,async(req,res)=>{
    try{
    
    const user =req.user;
    res.send(user);
    }
    catch(err)
    {
        res.status(400).send("Error "+ err.message);
    }
})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user;
    console.log("sending a connection request");
    res.send(user.firstname+" sent the connection request");
})

// ✅ Get All Users
app.get("/allUsers", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.send(allUsers);
    } catch (err) {
        res.status(400).send("Error fetching users: " + err.message);
    }
});

// ✅ Delete User by ID


// ✅ Connect to Database and Start Server
connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(7777, () => {
            console.log("Server is running on port 7777");
        });
    })
    .catch((err) => {
        console.log("Database connection failed", err);
    });

