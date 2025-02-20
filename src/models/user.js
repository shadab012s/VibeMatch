const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator=require("validator");

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
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("invalid email address "+value);
                
            }
        }
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
    phoneNumber: {
        type:Number,
        validate(value)
        {
            if(!validator.isMobilePhone)
                throw new Error("invalid number"+value);

        }

    },
    photoUrl:{
        type:String,
        default:"https://www.pngegg.com/en/png-mfrjz",
        validate(value)
        {
            if(!validator.isURL(value))
                throw new Error("invalid Url "+value)
        }

    },
    skills:{
        type:[String],
        validate(arr)
        {
            if(arr.length>=5)
                throw new Error("max 5 skills are allowed");
        }
    },
    about:{
        type:String,
        default:"hey dev welcome to our platform"
    },
    password:{
        type:String,
        validate(value)
        {
            if(!validator.isStrongPassword(value))
                throw new Error("not a strong password"+value);
        }
    }

},
{
    timestamps:true
}
);

// Model
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
