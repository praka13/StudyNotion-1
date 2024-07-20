const Course=require("../models/Course");
const Category=require("../models/Category");
const User=require("../models/User");
const {uploadToCloudinary}=require("../utils/imageUploader");
const { useSelector } = require("react-redux");
const CourseProgress = require("../models/CourseProgress");

//createCourse handler function

//const {courses}=useSelector((state)=>state.course);

function convertSecondsToDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor((totalSeconds % 3600) % 60)
  
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }
  

exports.createCourse=async(req,res)=>{


    try{

        //fetch data
        const{courseName,courseDescription,whatYouWillLearn,price,category,tag,status,instructions}=req.body;
        //get thumbnail
        const thumbNail=req.files.thumbNailImage;

        //validation

        if(!courseName||!courseDescription||!whatYouWillLearn||!price||!category||!thumbNail||!tag||!status||!instructions){
            return res.status(400).json({
                success:false,
                message:"All fields are required"

            })

        }
        if (!status || status === undefined) {
			status = "Draft";
		}

        //check for instructor

        const userId=req.user.id;
        const instructorDetails=await User.findById(userId)

        console.log("instructorDetails",instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor Not Found"
            })
        }

        //check given tag is valid or not

        const categoryDetails=await Category.findById(category);

        if(!categoryDetails){
            console.log(categoryDetails)

            return res.status(400).json({
                success:false,
                message:"Tag Not Found"
            })
        }

        //upload Image to Cloudinary

        const thumbNaiImage=await uploadToCloudinary(thumbNail,process.env.FOLDER_NAME);
        console.log("Image",thumbNaiImage);

        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag,
            category:categoryDetails._id,
            thumbNail:thumbNaiImage.secure_url,
            status:status,
            instructions:instructions,
        })
        console.log(newCourse);

        //add the new course to the user Schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )

        //update the tag Schema

        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push:{
                    course:newCourse._id
                }
            },
            {new:true},
        )


        //return response
        return res.status(200).json({
            success:true,
            message:"Course created Successfully",
            data:newCourse,
        })


    }
    catch(err){

        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Failed creating new Course",
            error:err.message
        })

    }
}

exports.showAllCourses=async(req,res)=>{
    try{
        const allCourses=await Course.find({})
                                    .populate("instructor")
                                    .populate("courseContent")
                                    .populate("category")
                                    .exec();
        return res.status(200).json({
            success:true,
            message:"Data fetched successfully",
            data:allCourses,
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch Course details",
            error:err.message

        })

    }
}

//getCourseDetails

exports.getCourseDetails=async(req,res)=>{
    try{
        //get courseId
        const {courseId}=req.body;
       
        //find CourseDetails

        const courseDetails=await Course.findById(
            courseId)
            .populate(
                {
                    path:"instructor",
                    populate:{
                        path:"additionalDetails"
                    }
                }
            )

            //.populate("category")
           
           // .populate("ratingandReviews")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            })
            

    if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:`Could not find course with ${courseId}`,

        })
    }
    //return response
    return res.status(200).json({
        success:true,
        message:"Course details fetched successfully",
        data:courseDetails

    })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })

    }
}

exports.editCourse=async(req,res)=>{

    try{
        const{courseName,courseDescription,whatYouWillLearn,price,category,tag,instructions,courseId,prevCourseCategory}=req.body;
    
        
           
    
            //c///onst categoryDetails=await Category.findOne({categoryName});

        
        
            if(req.files && req.files.thumbNailImage!==undefined){

                console.log("He1")

                const thumbNail=req.files.thumbNailImage
           
                const thumbNaiImage=await uploadToCloudinary(thumbNail,process.env.FOLDER_NAME);


                const updatedCourse=await Course.findByIdAndUpdate(
                    courseId,
                    {
                        courseName,
                        courseDescription,
                        whatYouWillLearn,
                        price,
                        category,
                        tag,
                        instructions,
                        thumbNail:thumbNaiImage.secure_url
            
            
                    },
                    {new:true}
                )
                .populate({
                    path:"courseContent",
                    populate:{
                        path:"subSection"
                    },
                })

                const moveFromCategory=await Category.findByIdAndUpdate(
                prevCourseCategory,
                {
                    $pull:{
                        course:updatedCourse._id
                    }
                },
                {new:true}
            )

                
                    const addToCategory=await Category.findByIdAndUpdate(
                        category,
                        {
                            $push:{
                                course:updatedCourse._id
                            }
                        },
                        {new:true}
                    )

                return res.status(200).json({
                    success:true,
                    data:updatedCourse,
                    
                })
            }

            else{




                const updatedCourse=await Course.findByIdAndUpdate(
                    courseId,
                    {
                        courseName,
                        courseDescription,
                        whatYouWillLearn,
                        price,
                        category,
                        tag,
                        instructions,
                        
            
            
                    },
                    {new:true}
                )
                .populate({
                    path:"courseContent",
                    populate:{
                        path:"subSection"
                    },
                })

                const moveFromCategory=await Category.findByIdAndUpdate(
                    prevCourseCategory,
                    {
                        $pull:{
                            course:updatedCourse._id
                        }
                    },
                    {new:true}
                )
    
                    
                        const addToCategory=await Category.findByIdAndUpdate(
                            category,
                            {
                                $push:{
                                    course:updatedCourse._id
                                }
                            },
                            {new:true}
                        )
    
                    return res.status(200).json({
                        success:true,
                        data:updatedCourse,
                        
                    })
                
            }
        
            

                    
   
     

 
    }

    catch(err){

        return res.status(400).json({
            success:false,
            message:err.message
        })

    }

}

exports.editCourseStatus=async(req,res)=>{

    try{
        const{courseId,status}=req.body;

        const resu=await Course.findByIdAndUpdate(
            courseId,
            {status:status},
            {new:true}
    
        )
    
        const result=await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
        })
    
        return res.status(200).json({
            success:true,
            message:"Status Updated Successfully",
            data:result
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

exports.getInstructorCourseDetails=async(req,res)=>{

    try{

        const userId=req.user.id;
    
        const result=await User.findById(userId)
        .populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        
    
        })
    
        return res.status(200).json({
            success:true,
            data:result,
        })

    }
    catch(err){

        return res.status(400).json({
            success:false,
            message:err
        })

    }
}

exports.deleteCourse=async(req,res)=>{
    try{

        const {courseId}=req.body;

        const result= await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message:"Course Deleted Successfully",
        }) 

    }
    catch(err){

        return res.status(400).json({
            success:false,
            message:"Course Not Deleted"
        })

    }
}

exports.getCourseDetails2=async(req,res)=>{
    try{
        //get courseId
        const {courseId}=req.body;
       
        //find CourseDetails

        const courseDetails=await Course.findById(
            courseId)
            .populate(
                {
                    path:"instructor",
                    populate:{
                        path:"additionalDetails"
                    }
                }
            )

            .populate("category")
           
           .populate("ratingandReviews")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            })
            

    if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:`Could not find course with ${courseId}`,

        })
    }
    //return response
    return res.status(200).json({
        success:true,
        message:"Course details fetched successfully",
        data:courseDetails

    })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })

    }
}


exports.getFullCourseDetails=async(req,res)=>{

    try{
        const {courseId}=req.body;
        const userId=req.user.id;

        //const userId=req.user.id;

        const courseDetails=await Course.findById(courseId)
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        })
        .populate("category")
        .populate("ratingandReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })

        let courseProgressCount=await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
            
           
        })

        console.log("courseProgressCount",courseProgressCount);

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }
        let totalDurationInSeconds=0;

        courseDetails.courseContent.forEach((content)=>{
            content.subSection.forEach((subSection)=>{
                const timeDurationInSeconds=parseInt(subSection.timeDuration);
                totalDurationInSeconds+=timeDurationInSeconds
            })
        })

        const totalDuration=convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success:true,
            data:{
                courseDetails,
                totalDuration,
                completedVideos:courseProgressCount?.completedVideos?courseProgressCount?.completedVideos:[]
            }
        })

    }
    catch(err){

        return res.status(500).json({
            success:false,
            message:err.message
        }) 

    }

}