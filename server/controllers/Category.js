//const { categories } = require("../../src/services/apis");
const Category=require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }


exports.createCategory=async(req,res)=>{

        try{
            //fetch data
            const{categoryName,description}=req.body;
            //validation
            if(!categoryName||!description){
                return res.status(400).json({
                    success:false,
                    message:"All fields are required"
                })
            }
            //create entry in db

            const categoryDetails=await Category.create({
                categoryName:categoryName,
                description:description,
            })
            console.log(categoryDetails);

            //return response

            return res.status(200).json({
                success:true,
                message:"Category created successfully"

            })

        }

        catch(err){
            return res.status(400).json({
                success:false,
                message:"Some error occurred"

            })

        }
}

exports.showAllCategory=async(req,res)=>{
    try{

        const allCategories=await Category.find({},{categoryName:true,description:true});

        return res.status(200).json({
            success:true,
            message:"All Categories returned successfully",
            data:allCategories,
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Some error occurred",
        })

    }
}

//categoryPageDetails

exports.categoryPage=async(req,res)=>{
    try{
        const {categoryId}=req.body;

        const selectedCategory=await Category.findById(categoryId)
        .populate({
            path:"course",
            match:{status:"Published"},
            
            populate:{
                path:"instructor",
               

                
              
            },

        })

        .populate({
            path:"course",
            match:{status:"Published"},
            
            populate:{
                path:"ratingandReviews",
               

                
              
            },

        })

        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Category Not Found"
            })
        }
        if(selectedCategory.course.length===0){
            return res.status(400).json({
                success:false,
                message:"No courses found in that category"
            })
        }

        const coursesExceptSelected=await Category.find({
            _id:{$ne:categoryId}
        })

        let differentCategory=await Category.findOne(
            coursesExceptSelected[getRandomInt(coursesExceptSelected.length)]._id

        )
        .populate(
            {
                path:"course",
                match:{status:"Published"},
                populate:{
                    path:"instructor",
                    
                  
                },
            }
        )
        .populate({
            path:"course",
            match:{status:"Published"},
            
            populate:{
                path:"ratingandReviews",
               

                
              
            },

        })

        const allCategories=await Category.find()
        .populate({
            path:"course",
            match:{status:"Published"},
            populate:{
                path:"instructor",
                
              
            },
        
        })
        .populate({
            path:"course",
            match:{status:"Published"},
            
            populate:{
                path:"ratingandReviews",
               

                
              
            },

        })

       

        const allCourses=allCategories.flatMap((category)=>category.course);

        const mostSellingCourses=allCourses.sort((a,b)=>b.sold-a.sold).slice(0,10);

        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses
            }
        })



    }
    catch(err){

        return res.status(400).json({
            success:false,
            error:err.message
        })

    }
}

