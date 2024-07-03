const Contact=require("../models/Contact");

exports.createContact=async(req,res)=>{

    try{
        const{firstName,lastName,email,message,phoneNo,countryCode}=req.body;

        if(!firstName||!lastName||!email||!message||!phoneNo||!countryCode){
            return res.status(400).json({
                suucess:false,
                message:"Please fill all details"
            })
        }

        const response=await Contact.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            message:message,
            phoneNo:phoneNo,
            countryCode:countryCode,

        })

        return res.status(200).json({
            success:true,
            response,
            message:"Contact Saved Successfully"
        })

    }
    catch(err){

        return res.status(400).json({
            success:false,
            message:"Some error occurred"
        })

    }
}