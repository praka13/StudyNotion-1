import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import { apiConnector } from '../../../../services/apiconnector';
import { courseEndpoints } from '../../../../services/apis';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

export const PublishCourse = () => {

    const {register,setValue,handleSubmit,getValues}=useForm();

    useEffect(()=>{
        if(courses?.status==="Published"){
            setValue("public",true);
        }
    },[])


    const dispatch=useDispatch();
    const {courses,editCourse}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();

    const editStatus=async(data,token)=>{
        try{

            const result=await apiConnector("POST",courseEndpoints.EDIT_COURSE_STATUS,data,{
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            })

            toast.success("Status Updated Successfully");
            console.log(courses);
            dispatch(setStep(1));
            dispatch(setCourse(null));
            navigate("/dashboard/my-courses");



            console.log(result);

        }
        catch(err){

            console.log(err);
            toast.error("Can't Update Status");

        }
    }

    const handleCoursePublish=async()=>{
        if((courses?.status==="Published" && getValues("public")===true)||(courses?.status==="Draft" && getValues("public")===false)){
            //no updation in form 
            //no need to make api call
            return
        }

        //if form updated
        const formData=new FormData();

        formData.append("courseId",courses?._id);

        const courseStatus=getValues("public")?"Published":"Draft";

        formData.append("status",courseStatus);

        await editStatus(formData,token);


    }



    const onSubmit=()=>{

        dispatch(setStep(1));
        dispatch(setCourse(null));
        dispatch(setEditCourse(false));
        navigate("/dashboard/my-courses");

        handleCoursePublish();

    }

    const goBack=()=>{
        dispatch(setStep(2));

    }
  return (
    <div className='h-screen'>
        <div className='h-[230px] w-[665px] bg-richblack-800 p-[24px] ml-[25px] rounded-xl'>


        <p className='font-semibold font-inter text-[24px] mb-[10px]'>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className='text-white mt-[30px]'>
                
                <input className='mr-[8px] w-[20px] h-[20px] bg-richblack-800' type="checkbox" id="public" {...register("public")}></input>
                <label htmlFor='public' className='font-medium text-[16px] text-richblack-400'>Make this Course as Public</label>
            </div>

            <div className='flex justify-between mt-[50px]' >
                <button onClick={goBack} type='button' className='w-[112px] h-[48px] bg-richblack-600 flex items-center justify-center gap-x-[10px] rounded-lg'>
                    <IoIosArrowBack/>
                    Back
                </button>
                <button  type='submit' className='w-[152px] h-[48px] text-richblack-600 flex items-center justify-center gap-x-[10px] rounded-lg bg-yellow-50'>
                    Save Changes
                </button>

                <button type='button' className='w-[252px] h-[48px] bg-richblack-600 flex items-center justify-center gap-x-[10px] rounded-lg' onClick={()=>{
                    dispatch(setStep(1));
                    dispatch(setCourse(null));
                    dispatch(setEditCourse(false));
                    navigate("/dashboard/my-courses");
                }}>
                    {

                        !editCourse ? (<div>Don't want to make course Public</div>):(<div>Don't want to make changes</div>)
                    }
                   
                </button>

            </div>


        </form>
        </div>


    </div>
  )
}
