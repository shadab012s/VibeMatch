
const validateSignUpdata=(req)=>{
    const{firstname,lastname,password}=req.body;
    if(!firstname ||!lastname)
    {
        throw new Error("firstname and lastname are required");

    }

if (!password) {
    return res.status(400).send("Password is required");
}

   
    
};
module.exports={
validateSignUpdata,
}