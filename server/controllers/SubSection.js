const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
require("dotenv").config();
const { uploadToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course");

//create subsection

exports.createSubSection=async(req,res)=>{
    try{
        //fetch data from req body
        const {title,description,courseId,sectionId}=req.body;
        //extract file/video
        const video=req.files.videoFile;

        //validation
        if(!sectionId||!video||!title||!description||!courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //upload video to cloudinary

        const uploadVideoDetails=await uploadToCloudinary(video,process.env.FOLDER_NAME);
        console.log(uploadVideoDetails);
        //create a sub-section

        const SubSectionDetails=await SubSection.create({
            title:title,
        
            description:description,
            videoUrl:uploadVideoDetails.secure_url,
            timeDuration:`${uploadVideoDetails.duration}`

        })
        //update section with this subSection ObjectId

        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
                                                               {
                                                                $push:{
                                                                    subSection:SubSectionDetails._id,
                                                                }
                                                               },{new:true}  )
                                                               //HW:log updated section,using populate
        const result=await Course.findById(courseId)        
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
        })
        //return response
        return res.status(200).json({
            success:true,
            message:"subsection created successfully",
            data:result
        }) 

    }
    catch(err){

        return res.status(500).json({
            success:false,
            message:"Some error occurred",
            error:err.message,
        })
        

    }
}


exports.updateSubSection=async(req,res)=>{

    try{
        const{title,description,subSectionId,courseId}=req.body;
        console.log(title);

        console.log(description);

        console.log(subSectionId);
        console.log(courseId)

       

       
    
        // if(!title||!description||!subSectionId||!video||!courseId){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Please fill all details"
        //     })
    
        // }
    
      
        
    
        if(req.files && req.files.videoFile!==undefined){
            console.log("Hello");
            const video=req.files.videoFile;
            const uploadVideoDetails=await uploadToCloudinary(video,process.env.FOLDER_NAME);
            console.log(uploadVideoDetails);
            const updatedSubSection=await SubSection.findByIdAndUpdate(subSectionId,
                {
                    title:title,
                    
                    description:description,
                    videoUrl:uploadVideoDetails.secure_url,
                    timeDuration:`${uploadVideoDetails.duration}`
                    
        
        
                },{new:true});
        }
        else{
            console.log("Hello1");
            const updatedSubSection=await SubSection.findByIdAndUpdate(subSectionId,
                {
                    title:title,
                    
                    description:description,
                  
        
        
                },{new:true});
        }

            const result=await Course.findById(courseId)        
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                },
            })
    
        return res.status(200).json({
            success:true,
            message:"Subsection Updated Successfully",
            data:result
    
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Some Error Occured"
        })
    }




}



exports.deleteSubSection=async(req,res)=>{
    try{
        //get Id-assuming that we are sending Id in params
        const{subSectionId,courseId}=req.body;

        //use findByIdAndDelete
        await SubSection.findByIdAndDelete(subSectionId);
        //TODO do we need to delete the entry from the course Schema

        const result=await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
        })
        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection deleted sucessfully",
            data:result
        })


    }
    catch(err){

        return res.status(500).json({
            success:false,
            message:"Some error occurred",
            error:err.message,
        })
        
        

    }
}