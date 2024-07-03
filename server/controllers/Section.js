const Course=require("../models/Course");
const Section=require("../models/Section");
const SubSection=require("../models/SubSection");



exports.createSection=async(req,res)=>{
    try{
        //data fetch
        const{sectionName,courseId}=req.body;
        //data validation
        if(!sectionName||!courseId){
            return res.status(400).json({
                success:false,
                message:"Please fill all fields"
            })
        }
        //create section
        const newSection=await Section.create({sectionName});
        //update course with section ObjectId

        const updatedCourse=await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true}
        )
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
        })
        //HW:use populate to replace section/sub-sections both in the updatedCourse
        //return response 
        return res.status(200).json({
            success:true,
            message:"Section creation successful",
            data:updatedCourse

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

exports.updateSection=async(req,res)=>{
    try{
        //data input
        const{sectionName,sectionId,courseId}=req.body;
        //data validation
        if(!sectionName||!sectionId){
            return res.status(400).json({
                success:false,
                message:"Please fill all fields"
            })

        }

        //update data
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true})
        const course=await Course.findById(courseId)        
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
        })
        //return res
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
            data:course
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

exports.deleteSection=async(req,res)=>{
    try{
        //get Id-assuming that we are sending Id in params
        const{courseId,sectionId}=req.body;
        console.log(sectionId);
        console.log(courseId);
        //const section=await Section.findById(sectionId).populate("subSection");

        //use findByIdAndDelete
        // if((section.subSection).length!==null){
                   
        // for(let i=0;i<(section.subSection).length;i++){
        //     await SubSection.findByIdAndDelete(section.subSection[i])
        // }
        // }

        await Section.findByIdAndDelete(sectionId);

        const result=await Course.findById(courseId)
                                            .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection"
                                                },
                                            })
        //TODO do we need to delete the entry from the course Schema
        //return response
        return res.status(200).json({
            success:true,
            message:"Section deleted sucessfully",
            data:result
           
        })


    }
    catch(err){
        
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Some error occurred",
            error:err.message,
        })
        
        

    }
}