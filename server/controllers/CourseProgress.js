const CourseProgress=require("../models/CourseProgress");
const Course=require("../models/Course");
const User = require("../models/User");

exports.createCourseProgress=async(req,res)=>{

    try{
        const {courseId}=req.body;

        const userId=req.user.id;

        const courseDetails=await Course.findById(courseId);
        const courseProgressDetails=await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        })

        if(courseDetails.studentsEnrolled.includes(userId) && !courseProgressDetails){

            const courseProgress=await CourseProgress.create({
                courseId:courseId,
                userId:userId
            })
            const enrolledStudent=await User.findByIdAndUpdate(userId,{
                $push:{
                    courseProgress:courseProgress?._id
                }
            },{new:true})

            return res.status(200).json({
                sucess:true,
                message:"Course Progress Schema created successfully",
                data:courseProgress

            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Course Progress Schema Already created"
            })
        }

    }
    catch(err){

        return res.status(401).json({
            sucess:false,
            message:"Some Error Occurred",
            message2:err.message
        })

    }

}

exports.addSubSection=async(req,res)=>{

    try{
        const {courseId,subSectionId}=req.body;
        const userId=req.user.id;

        const courseProgressDetails=await CourseProgress.findOneAndUpdate(
            {courseId:courseId,userId:userId},{
                $push:{completedVideos:subSectionId}
            },
            {new:true}
            
            
            )

        return res.status(200).json({
            success:true,
            data:courseProgressDetails
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })

    }

}

exports.findCourseProgress=async(req,res)=>{
    try{
        const {courseId}=req.body;
        console.log(courseId)
        const userId=req.user.id;
        console.log(userId);
        const courseProgressDetails=await CourseProgress.findOne({
            courseId:courseId,userId:userId
        })

        console.log(courseProgressDetails);
        return res.status(200).json({
            sucess:true,
            data:courseProgressDetails
        })

    }
    catch(err){

        return res.status(400).json({
            success:false,
            message:err.message
        }) 

    }
}