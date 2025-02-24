const jwt=require('jsonwebtoken');
const User=require('../models/user');
const userAuth=async(req,res,next)=>{
    //it checks that token is present or not
    //Read the token from the req cookies
    try{const cookies=req.cookies;
    const {token}=cookies;
    const decodedObj=await jwt.verify(token,"secret key",{expiresIn:"1h"});
    const{_id}=decodedObj;
    const user =await User.findById(_id);
    if(!user)
        throw new Error("user not found");
    req.user=user;
    next();
}
    catch(err)
    {
        res.status(400).send("Error "+err.message);
    }
    
}
module.exports={
    userAuth,
}