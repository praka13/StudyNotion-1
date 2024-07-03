import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setStep } from '../../../../slices/courseSlice';
import { apiConnector } from '../../../../services/apiconnector';
import { courseEndpoints } from '../../../../services/apis';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const PublishCourse = () => {

    const {register,setValue,handleSubmit,getValues}=useForm();

    useEffect(()=>{
        if(courses?.status==="Published"){
            setValue("public",true);
        }
    },[])


    const dispatch=useDispatch();
    const {courses}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();

    const editStatus=async(data,token)=>{
        try{

            const result=await apiConnector("POST",courseEndpoints.EDIT_COURSE_STATUS,data,{
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            })

            toast.success("Status Updated Successfully");

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

        handleCoursePublish();

    }

    const goBack=()=>{
        dispatch(setStep(2));

    }
  return (
    <div className='h-screen'>

        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className='text-white'>
                
                <input type="checkbox" id="public" {...register("public")}></input>
                <label htmlFor='public'>Make this Course as Public</label>
            </div>

            <div >
                <button onClick={goBack} type='button'>
                    Back
                </button>
                <button className='ml-[10px]' type='submit'>
                    Save Changes
                </button>
            </div>


        </form>

    </div>
  )
}
