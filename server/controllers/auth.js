const User=require("../models/User");
const OTP=require("../models/OTP");
const Profile=require("../models/Profile");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config()

//sendOtp
exports.sendOTP=async(req,res)=>{


    try{
            //fetch email from request body
    const {email}=req.body;

    //check if user already exits
    const checkUserPresent=await User.findOne({email});

    //if user already exists then return aresponse
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User already registered"
        })
    }
    //generate otp

    var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    }
    )
    console.log("OTP Generated",otp);

    //check unique otp or not
    let result=await OTP.findOne({otp:otp})

    while(result){
        otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        }
        )
        result=await OTP.findOne({otp:otp})

    }
    const otpPayload={email,otp};

    //create an entry in db

    const otpBody=await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
        success:true,
        message:"OTP sent successfully",
        otp,
    })



    }
    catch(err){

        console.log(err);
        return res.status(400).json({
            success:false,
            message:err.message

        }) 

    }


}


//signUp

exports.signUp=async (req,res)=>{

        try{

                //1 data fetch from request body
    //2 validate data
    //3 ->2 match password
    //4 check user already exist or not
    //5 find most recent otp for the user
     //6 validate OTP
     //7 hash password
     //8 create entry in db
     //9 return res

     const {firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp}=req.body

        if(!firstName||!lastName||!email||!password||!confirmPassword||!otp){
            return res.status(400).json({
                success:false,
                message:"Enter all details"
            })
        }

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirmPassword value does not match"
            })
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered"
            })
        }

        const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("otp is",otp)
        console.log("Recent otp is",recentOTP[0].otp);

        if(recentOTP.length===0){
            return res.status(400).json({
                success:false,
                message:"OTP not Found"
            }) 
        }
        else if(otp!==recentOTP[0].otp){
            return res.status (400).json({
                success:false,
                message:"OTP not matching"
            })
        }

        else{
            const hashedPassword=await bcrypt.hash(password,10);
            let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);


            

            const profileDetails=await Profile.create({
                gender:null,
                dateOfBirth:null,
                contactNumber:null,
                about:null,
            })
    
            const user=await User.create({
                firstName,
                lastName,
                email,
                password:hashedPassword,
                accountType,
                approved: approved,
                additionalDetails:profileDetails._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    
    
    
    
            })
    
           return res.status(200).json({
                success:true,
                message:"Sign Up Successful"
    
            })
    
        }

        }
        catch(err){
            console.log(err);

            return res.status(500).json({
                message:false,
                message:"Some Error Occurred in sign up",
                
            })


        }





}






//login

exports.login=async (req,res)=>{

    try{
        //get data from req body

        const {email,password}=req.body;
        //validate data

        if(!email||!password){
            return res.status(403).json({
                success:false,
                message:"Please fill all fields"
            }) 
        }
         //user check exist or not
        const user=await User.findOne({email})
        .populate("additionalDetails")


        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
       
        //generate jwt ,after password matching

        //console.log(await bcrypt.compare(password,user.password))

        if(await bcrypt.compare(password,user.password)){

            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token=token;
            user.password=undefined;
        
        //create cookie and send rsponse 
        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Logged in successfully"

        })
        
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Password incorrect"
        })
    }


    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login failure,please try again"
        })

    }



}





exports.changePassword=async(req,res)=>{
        try{
                //get data from req body

    //get oldPassword,newPasword,confirmNewPassword
    const{currentPassword,changePassword}=req.body;
    console.log(currentPassword,changePassword);
    const id=req.user.id;
    console.log(id);

    //validation
    if(!currentPassword||!changePassword){
        return res.status(403).json({
            success:false,
            message:"please enter all details"
        })
    }
    console.log("hello");
    const userDetails=await User.findById(id);
    console.log("hello");
    console.log(userDetails);
    
    
        if(await bcrypt.compare(currentPassword,userDetails.password)){
              //update pwd in dbfirst
              console.log("hello");
              let hashedPassword=await bcrypt.hash(changePassword,10);
              console.log(hashedPassword);
            const user= await User.findByIdAndUpdate(
                id,{password:hashedPassword},{new:true}
                
        )

        return res.status(200).json({
            success:true,
            message:"Password Successfully Changed",
            userDetails,
            user
        })
       
        }
        else{
            return res.status(400).json({
                success:false,
                message:"current password is wrong"
            })
        }

    
   
       //await mailSender(email,"Password Updated","Your Password is successfully updated");
    //res


        }
        catch(err){
            console.log("Hello");
            return res.status(400).json({
                success:false,
                message:err
            })

        }


  
 

}