const Category=require("../models/Category");


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
            message:"All tags returned successfully",
            allCategories,
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
        //get categoryId
        const {categoryId}=req.body;
        //get courses for specified category id
        const selectedCategory=await Category.findById(categoryId)
                                                    .populate("course")
                                                    .exec();

        //validation
        if(!selectedCategory){
            return res.status(400).json({
                success:false,
                message:"Data not found"
            });
        }

        //get courses for dfferent categories
        const differentCategories=await Category.find(
            {_id:{$ne:categoryId}}
        )
        .populate("course").exec()
        //get top selling courses

		const allCategories = await Category.find().populate("courses");
		const allCourses = allCategories.flatMap((category) => category.course);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);
        //return response

        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories
            }
        })


    }
    catch(err){

        return res.status(400).json({
            success:false,
            message:"Some error occurred",
        })


    }
}

