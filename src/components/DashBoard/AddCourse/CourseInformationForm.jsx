import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiconnector';
import { courseEndpoints } from '../../../services/apis';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { TagInput } from './TagInput';
import { Upload } from './Upload';
import { RequirementField } from './RequirementField';
import { setCourse, setStep } from '../../../slices/courseSlice';
import toast from 'react-hot-toast';



export const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    }=useForm();



    const dispatch=useDispatch();

    const {token}=useSelector((state)=>state.auth);
    const {courses,editCourse,step}=useSelector((state)=>state.course);

    const editCourseHandler=async(data,token)=>{
        try{
            const result=await apiConnector("POST",courseEndpoints.EDIT_COURSE_API,data,{
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            })
            console.log(result);
            dispatch(setCourse(result.data.data));
            toast.success("Course Edited Successfully");
            dispatch(setStep(2));

        }
        catch(err){

            console.log("error",err);
            toast.error("Some Error Occurred")
        }
    }

    const createCourseHandler=async(data,token)=>{
        try{

            const result=await apiConnector("POST",courseEndpoints.CREATE_COURSE_API,data,{
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            })
            console.log(result);
            console.log(result.data.data)
            dispatch(setCourse(result.data.data));
            console.log(courses?.courseName);
            console.log(courses?._id);
           dispatch(setStep(2));
            toast.success("Course Created Successfully")


        }
        catch(err){
            console.log(err.message);
            toast.error("Can't create course")

        }
    }

    

    const {loading,setLoading}=useState(false);

    const [courseCategories,setCourseCategories]=useState([]);

    const fetchSubLinks=async()=>{
        try{
            const result=await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API);
            console.log(result);
            console.log("Printing SubLink Results" ,result.data.data);
            setCourseCategories(result.data.data);
            console.log("Hello",courseCategories);


        }
        catch(err){
            console.log("Could not fetch category details")
        }
    }

    useEffect(()=>{
        fetchSubLinks();
        //console.log(courses.category);
        console.log("hello")

        if(editCourse){
            setValue("courseTitle",courses.courseName);
            console.log(courses.courseName);
            setValue("courseShortDesc",courses.courseDescription);
            setValue("coursePrice",courses.price);
            console.log(courses.category)

            
           
            setValue("courseCategory",courses.category);
            setValue("courseTags",courses.tag);
            console.log(courses.whatYouWillLearn);
            setValue("courseBenefits",courses.whatYouWillLearn);
           
            setValue("courseRequirements",courses.instructions);
            setValue("courseImage",courses.thumbNail);
        }

    },[]);

    const isFormUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.courseTitle!==courses.courseName||
            currentValues.courseShortDesc!==courses.courseDescription||
            currentValues.coursePrice!==courses.price||
            currentValues.courseTags.toString()!==courses.tag.toString()||
            currentValues.courseBenefits!==courses.whatYouwillLearn||
            currentValues.courseCategory!==courses.category||
            currentValues.courseRequirements.toString()!==courses.instructions.toString()||
            currentValues.courseImage!==courses.thumbNail){
            
            return true
        }
        else{
            return false
        }
            
    }

    const onSubmit=async(data)=>{
        console.log(data);

        if(editCourse){
            if(isFormUpdated){
            const currentValues=getValues();
            const formData=new FormData();

            console.log(courses);

            formData.append("courseId",courses?._id);
            console.log(courses?._id);
            formData.append("prevCourseCategory",courses?.category);
            console.log(courses?.category);
            formData.append("courseName",data.courseTitle);
            formData.append("courseDescription",data.courseShortDesc);
            formData.append("price",data.coursePrice);
            formData.append("whatYouWillLearn",data.courseBenefits);
            formData.append("category",data.courseCategory);
            console.log(data.courseCategory);
            formData.append("instructions",JSON.stringify(data.courseRequirements));
            formData.append("thumbNailImage",data.courseImage);
            formData.append("tag",JSON.stringify(data.courseTags));

            await editCourseHandler(formData,token);




            }
            else{
                toast.error("No changes made")
            }
            return
        }

        //create a new course
        
        const formData=new FormData();

        formData.append("courseName",data.courseTitle);
        formData.append("courseDescription",data.courseShortDesc);
        formData.append("price",data.coursePrice);
        formData.append("whatYouWillLearn",data.courseBenefits);
        formData.append("category",data.courseCategory);
        console.log(data.courseCategory);
        formData.append("instructions",JSON.stringify(data.courseRequirements));
        formData.append("thumbNailImage",data.courseImage);
        formData.append("tag",JSON.stringify(data.courseTags));
        formData.append("status","Draft")

        const result=await createCourseHandler(formData,token);



    }

  return (
  
<div className='flex items-center justify-center w-[720px] text-white'>
<form onSubmit={handleSubmit(onSubmit)} className="rounded-md border-richblack-700 bg-richblack-800 p-6 h-fit w-[665px] flex flex-col">

<div className='w-[617px] h-[76px] mb-[26px]'>
    <label htmlFor='courseTitle' className='text-sm font-inter text-[14px] text-white'>Course Title<sup className='text-pink-400'>*</sup></label>
    <input id="courseTitle" placeholder='Enter Course Titles' {...register("courseTitle",{required:true})} className='w-[617px] h-[48px] text-richblack-100 mt-[6px] p-[12px] rounded-md bg-richblack-700' ></input>
    {errors.courseTitle && (
    <span>Course Title is required</span>
)}

</div>

<div className='mb-[26px]'>
    <label htmlFor='courseShortDesc' className='text-sm font-inter text-[14px] text-white'>Course Short Description<sup className='text-pink-400'>*</sup></label>
    <textarea
    id="courseShortDesc"
    placeholder='Enter Description'
    {...register("courseShortDesc",{required:true})}
    className='min-h-[140px] rounded-md text-richblack-100 mt-[6px] bg-richblack-700 p-[12px] w-[617px] h-[127px]'
    />
    {
        errors.courseShortDesc&&(
            <span>
                Course Description is required
            </span>
        )
    }
</div>

<div className='relative w-[617px] h-[76px] mb-[26px]'>
    <label htmlFor='coursePrice' className='text-sm font-inter text-[14px] text-white'>Course Price<sup className='text-pink-400'>*</sup></label>
    <input id="coursePrice" placeholder='Enter Course Price' {...register("coursePrice",{required:true,valueAsNumber:true})} className='w-full  mt-[6px] h-[48px] px-[32px] text-richblack-100 bg-richblack-700 rounded-md'></input>
    <div className='w-[24px] h-[24px] flex justify-center items-center'>
    <HiOutlineCurrencyRupee fontSize={28} className='absolute top-1/2 text-richblack-500 '/>
    </div>
    {errors.coursePrice && (
    <span>Course Price is required</span>
)}

</div>

<div className='flex flex-col'>
    <label htmlFor='courseCategory' className='text-sm font-inter text-[14px] text-white'>Course Category<sup className='text-pink-400'>*</sup></label>
    <select
    id='courseCategory'
    defaultValue=''
    className='p-[12px] rounded-md w-[617px] h-[48px] bg-richblack-700 text-richblack-100 mt-[6px]'
    {...register("courseCategory",{required:true})}
    >
        <option value="" disabled className=''>Choose a Category</option>
        {
            !loading && courseCategories.map((category,index)=>(
                (<option className='text-richblack-100' key={index} value={category?._id}>
                    {category?.categoryName}
                </option>
                )
            ))
        }
    </select>
    {
        errors.courseCatgory&&(
            <span>
                courseCatgory is required
            </span>
        )
    }
</div>

<div className='text-white'>
    <TagInput
    name="courseTags"
    register={register}
    setValue={setValue}
    getValues={getValues}
    errors={errors}
    />
</div>

<div className='text-white'>
    <Upload
    name="courseImage"
    register={register}
    setValue={setValue}
    errors={errors}
    getValues={getValues}
    />
</div>

<div className='mt-[26px]'>
    <label className='text-sm font-inter text-[14px] text-white'>Benefits of the Course<sup className='text-pink-400'>*</sup></label>
    <textarea 
    id="courseBenefits"
    placeholder='Enter Benefits of the course'
    className='w-[617px] h-[127px]  mt-[6px] p-[12px] rounded-md bg-richblack-700 text-richblack-100'
    {...register("courseBenefits",{required:true})}
    />
    {errors.courseBenefits && (
        <span>
            Enter Benefits of the course
        </span>
    )}
</div>

<div className='text-white'>
<RequirementField
name="courseRequirements"
register={register}
errors={errors}
setValue={setValue}
getValues={getValues}

/>
</div>


<div className='mt-[20px] flex gap-[20px] mb-[100px]'>
    {
        editCourse && (
            <button
            onClick={()=>dispatch(setStep(2))}
            className='flex items-center gap-x-2 bg-richblack-300 p-[12px] rounded-md'
            >
                Continue without saving
            </button>
        )
    }

    
        <button type="submit" className='flex items-center gap-x-2 bg-yellow-300 p-[12px] rounded-md'>
            {
                !editCourse ? "Next":"Save Changes"
            }

        </button>
    
</div>





</form>
</div>

        
    
  )

        }
        
