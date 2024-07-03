const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    courseDescription:{
        type:String,
    
        
    },
    whatYouWillLearn:{
        type:String
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",

        }
    ],
    ratingandReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }],
    price:{
        type:Number,
    },
    thumbNail:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",


    },
    tag:{
        type:[String],
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"

    }],
    instructions:{
        type:[String],
    },
    status:{
        type:String,
        enum:["Draft","Published"]
    }

})

module.exports=mongoose.model("Course",courseSchema)