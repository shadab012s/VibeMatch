const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname:{ 
        type: String,  // Corrected field 
        require:true,
        minLength:4,
        maxLength:50,
    },
    lastname: {
        type: String,
        minLength:3,
        maxLength:40,

    },
    age: {
        type:Number,
        min:12,
        max:70,
        required:true,


    },
    email: {type:String,
        unique:true,
        required:true,
        lowecase:true,
        trim:true,
    },
    gender:{
    type:String,
    validate(value)
    {
        if(!["male","female","others"].includes(value))
        {
            throw new Error("gender data is not valid, only male , female and others allowed");
        }
    }
    },
    phoneNumber: Number,
    photoUrl:{
        type:String,
        default:"https://www.pngegg.com/en/png-mfrjz"
    },
    skills:{
        type:[String],
    },
    about:{
        type:String,
        default:"hey dev welcome to our platform"
    }

},
{
    timestamps:true
}
);

// Model
const userModel = mongoose.model("m1", userSchema);
module.exports = userModel;
