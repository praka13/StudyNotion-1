const mongoose=require("mongoose");
const Course=require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

//create Rating

exports.createRating=async(req,res)=>{

    try{


    //get userId
    const{userId}=req.user.id;
    //fetch data from req body
    const{rating,review,courseId}=req.body;
    //check if user is enrolled or not
    const courseDetails=await Course.findOne({_id:courseId, studentsEnrolled:{$elemMatch:{$eq:userId}}});

    if(!courseDetails){
        return res.status(404).json({
            success:false,
            message:"Student is not enrolled in the course",
        });
    }
    //check if user alrady reviewed the course
    const alreadyReviewed=await RatingAndReview.findOne({user:userId,course:courseId});

    if(alreadyReviewed){
        return res.status(403).json({
            success:false,
            message:"Course is already reviewed"

        })
    }
    //create ratingandreview
    
    const ratingReview=await RatingAndReview.create({
        rating,review,
        course:courseId,
        user:userId
    })

    //update course with this rating and review

    const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,
                                            {
                                                $push:{
                                                    ratingandReviews:ratingReview._id
                                                }
                                            },{new:true});


    console.log(updatedCourseDetails);
    //return response

    return res.status(200).json({
        success:true,
        message:"Rating and Review Successfully",
        ratingReview
    })

    }
    catch(err){

        return res.status(400).json({
            success:false,
            message:"Some Error Occurred"
        })

    }
  
}

exports.getAverageRating=async(req,res)=>{
    try{

        //get courseId
        const{courseId}=req.body;
        //calculate average rating
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        

        ])

        if(result.length>0){

            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })

        }

        return res.status(200).json({
            success:"true",
           message:"No rating given till now"
        })
    

    }
    catch(err){

        return res.status(400).json({
            success:false,
            message:"Some Error Occurred"
        })


    }
}


//getAllRAting

exports.getAllRatingAndReviews=async(req,res)=>{
    try{

        const allReviews=await RatingAndReview.find({})
                                     .sort({rating:"desc"})  
                                     .populate({
                                        path:"user",
                                        select:"firstName lastName email image"
                                     }) 

                                     .populate({
                                        path:"course",
                                        select:"courseName"
                                     })

        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
        })

    }
    catch(err){

        return res.status(400).json({
            success:false,
            message:"Some Error Occurred"
        })


    }
}