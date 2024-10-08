const User=require("../models/User");
const Profile=require("../models/Profile");
const Course=require("../models/Course");
const { uploadToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");


exports.updateProfile=async(req,res)=>{
    try{
        //fetch data
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;
        //get userId
        const id=req.user.id;
        //validate
        if(!contactNumber||!gender){
            return res.status(400).json({
                success:false,
                message:"All fields are rquired"
            })

        }
        //find profile
        const userDetails=await User.findById(id).populate("additionalDetails");
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId);
        //update the profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;

        await profileDetails.save();
        

        //return response\

        return res.status(200).json({
            success:true,
            message:"Profile Updated successfully",
            profileDetails,
            userDetails
        })

    }
    catch(error){

        return res.status(400).json({
            success:false,
            message:error.message
        })

    }
}

//delete account

exports.deleteAccount=async(req,res)=>{
    try{

        //get id
        const id=req.user.id;
        console.log(id);
        //validation
        const userDetails=await User.findById({_id:id}); 
        
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            }) 
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        
        //await Course.findByIdAndDelete({_id:Course.studentsEnrolled.userDetails});
        //Todo:unenroll user from all enrolled courses();
        //delete User
        await User.findByIdAndDelete({_id:id});

        
        //return response
        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })

    }
    catch(error){

        return res.status(400).json({
            success:false,
            message:"User can't be deleted",
            error:error.message,
        })

        

    }
}

exports.getAllUserDetails=async(req,res)=>{
    try{

        //get id
        const id=req.user.id;

        //validation and user details

        const userDetails=await User.findById(id).populate("additionalDetails").exec();


        return res.status(200).json({
            success:true,
            message:"User Data fetched successfully",
            userDetails
        })





    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        })

    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId);
      console.log("Hello");
      console.log(req.body);
      const displayPicture = req.files.displayPicture;
      console.log("Hello");

      console.log(displayPicture)
      
      const image = await uploadToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
         userId ,
        { image: image.secure_url },
        { new: true }
      ).populate("additionalDetails");
      return res.status(200).json({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      console.log("Hello");
      return res.status(500).json({
        success: false,
        message: error,
      })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      console.log(userId);
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path:"courses",
          populate:({
            path:"courseContent",
            populate:({
              path:"subSection"
            })

          })
        })


        userDetails=userDetails.toObject()
        for(var i=0;i<userDetails.courses.length;i++){
          let courseProgressCount=await CourseProgress.findOne({
            courseId:userDetails.courses[i]._id,
            userId:userId,
          })
          let courseProgress=courseProgressCount?.completedVideos.length
          userDetails.courses[i].completedLectures=courseProgress
        }
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.getEnrolledCourses2 = async (req, res) => {
  try {
    const userId = req.user.id
    console.log(userId);
    const userDetails = await User.findOne({
      _id: userId,
    })

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.instructorDashboard=async(req,res)=>{
  try{
    const courseDetails=await Course.find({instructor:req.user.id});

    const courseData=courseDetails.map((course)=>{
      const totalStudentsEnrolled=course.studentsEnrolled.length;
      const totalAmountGenerated=totalStudentsEnrolled*course.price;
      // console.log(totalAmountGenerated);
      // console.log(totalStudentsEnrolled);

      //create an new object with the additional fields

      const courseDatawithStats={
        _id:course._id,
        courseName:course.courseName,
        courseDesc:course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated

      }

       return courseDatawithStats
    })

    return res.status(200).json({courses:courseData})

    

    

    

  }
  catch(err){
    console.error(err);
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}