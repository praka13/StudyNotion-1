const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User")

//auth
exports.auth=async(req,res,next)=>{
    try{

        //extract the token
        const token=req.cookies.token||req.body.token
        ||req.header("Authorisation").replace("Bearer ","");

        console.log(token);

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
        }

        //verify the token
        try{
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode


        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })

        }
        next()

    }
    catch(err){

        return res.status(401).json({
            success:false,
            
            message:err.message

        })

    }
}



//isStudent

exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is not a student"
            }) 
        }

        next();
        

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })

    }
}


//isInstructor

exports.isInstructor=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is not a instructor"
            }) 
        }

        next();
        

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })

    }
}

//isAdmin

exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is not a admin"
            }) 
        }

        next();
        

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })

    }
}
