// src/app.js

const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./models/user"); // Importing User model

const app = express();
app.use(express.json()); // Middleware to parse JSON

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
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid)
        {
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

// ✅ Get User by Email
app.get("/user", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send("Email is required");
        }

        const users = await User.find({ email });

        if (users.length === 0) {
            return res.status(404).send("User not found");
        }

        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

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
app.delete("/deleteUser", async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).send("User ID is required");
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
    }
});

// ✅ Update User
app.patch("/updateUser", async (req, res) => {
    try {
        const { id, ...updates } = req.body;

        if (!id) {
            return res.status(400).send("User ID is required");
        }

        const allowedUpdates = ["photoUrl", "about", "skills", "password", "phoneNumber"];
        const isUpdateAllowed = Object.keys(updates).every((key) => allowedUpdates.includes(key));

        if (!isUpdateAllowed) {
            return res.status(405).send("Update not allowed");
        }

        // Hash new password if updated
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, {
            new: true, // Return updated user
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.send({ message: "Updated successfully", user: updatedUser });
    } catch (err) {
        res.status(400).send("Update failed: " + err.message);
    }
});

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

