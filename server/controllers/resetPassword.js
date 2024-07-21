const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

//resetPasswordToken

exports.resetPasswordToken=async(req,res)=>{
    

    try{
           //get email from req body
    const {email}=req.body;
    //check user for this email,email validation
    const user=await User.findOne({email});
    if(!user){
        return res.json({
            success:false,
            message:"Your Email is not rgistered with us"
        });
    }
    //generate token
    const token = crypto.randomBytes(20).toString("hex");
    //update user by adding token and expiration time
    const updatedDetails=await User.findOneAndUpdate(
        {email:email},
        {
            token:token,
            resetPasswordExpires:Date.now()+3600000,
        },
        {new:true}
    )
    //create url
    const url=`https://studynotion-backend-r59x.onrender.com/update-password/${token}`
    //send mail containing the url
    await mailSender(email,"Password Reset Link",`Password reset link:${url}`);
    //return response
    return res.json({
        success:true,
        message:"Please check email and update your password",
        updatedDetails,
    })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while resetting password",
            error:err.message
        })

    }

}

exports.resetPassword=async(req,res)=>{
    try{
            //fetch data
    const {password,confirmPassword,token}=req.body
    //validation
    if(password!==confirmPassword){
        return res.json({
            success:false,
            message:"Password not matching"
        })
    }
    //get user details db using token
    const userDetails=await User.findOne({token});
    //if no entry-invalid token
    if(!userDetails){
        return res.json({
            success:false,
            message:"Token is invalid",
        })
    }
    console.log(!(userDetails.resetPasswordExpires>Date.now()))
        //token time check
    if(!(userDetails.resetPasswordExpires>Date.now())){
        return res.json({
            success:false,
            message:"Token is expired"
        })

    }

    //hashed password

    const hashedPassword=await bcrypt.hash(password,10);
    console.log(hashedPassword);
    console.log(token)

    //password update
    const updatedDetails= await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true}
    );
    console.log(updatedDetails);
    //return response

    return res.status(200).json({
        success:true,
        message:"Password reset successful"
    })


    }

    catch(err){
        return res.status(400).json({
            success:false,
            message:"Some error occurred while resetting password",
            error:err.message
        })

    }
}