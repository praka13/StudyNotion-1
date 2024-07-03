import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../../services/apiconnector';
import { courseEndpoints } from '../../../../services/apis';
import { setCourse } from '../../../../slices/courseSlice';
import { RxCross2 } from "react-icons/rx";
import { UploadVideo } from '../UploadVideo';

export const SubSectionModal = ({
    modalData,
    setModalData,
    add=false,
    view=false,
    edit=false
}) => {

    const {register,handleSubmit,setValue,formState:{errors},getValues}=useForm();
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const {token}=useSelector((state)=>state.auth);
    const {courses}=useSelector((state)=>state.course);

    useEffect(()=>{
        if(view||edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl)
        }
    },[]);

    const createSubSection=async(formData,token)=>{
        try{
            console.log(token);
            const result=await apiConnector("POST",courseEndpoints.CREATE_SUBSECTION_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
              })
    
              console.log(result);
             
              dispatch(setCourse(result.data.data));
              setModalData(null);
              toast.success("Sub Section Created Successfuly")
        }
        catch(err){
            console.log(err);
            toast.error("Cannot create Sub Section")

        }

    }

    const updateSubSection=async(formData,token)=>{


        try{
            console.log(token);
            const result=await apiConnector("POST",courseEndpoints.UPDATE_SUBSECTION_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
              })

              console.log(result);
             
              dispatch(setCourse(result.data.data));
              setModalData(null);
              toast.success("Sub Section Updated Successfuly")

        }
        catch(err){

            console.log(err.message);
            toast.error("Cannot update Sub Section")


        }

    }

    const isFormUpdated=()=>{
        const currentValues=getValues();

        if(currentValues.lecture!==modalData.title||
            currentValues.lectureDesc!==modalData.description||
            currentValues.lectureVideo!==modalData.videoUrl){
                return true
            }
        else{
            return false;
        }
    }

    const handleEditSubSection=async()=>{

        const currentValues=getValues();
        console.log(currentValues.lectureVideo);
        const formData=new FormData();

        formData.append("courseId",courses?._id);
        formData.append("subSectionId",modalData._id);

        
            formData.append("title",currentValues.lectureTitle);
      
       
            formData.append("description",currentValues.lectureDesc);
        
      
            formData.append("videoFile",currentValues.lectureVideo);
       

        setLoading(true);

        await updateSubSection(formData,token);

        setLoading(false);


    }

    const onSubmit=async(data)=>{
        if(view){
            return
        }
        if(edit){
            if(!isFormUpdated){
                toast.error("No Changes Made to the Form")
            }
            else{
                handleEditSubSection();
            }
            return
        }

        const formData=new FormData();

        formData.append("sectionId",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDesc);
        formData.append("videoFile",data.lectureVideo);
        formData.append("courseId",courses?._id)
       setLoading(true);

        await createSubSection(formData,token);
    setLoading(false);
    
    }
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm ">
       <div>
            <div className='w-[665px] h-[58px] bg-richblack-700 flex items-center justify-between p-[12px] rounded-t-lg'>
                <p className='text-lg font-semibold text-[hsl(0,0%,100%)] font-inter text-[18px]'>{view && "View Lecture"} {add && "Add Lecture"} {edit && "Edit Lecture"}</p>
                <button   onClick={()=>setModalData(null)}><RxCross2 className='w-[24px] h-[24px] font-semibold'/></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=' bg-richblack-800 flex flex-col p-[16px] gap-y-[8px] items-center justify-center'>
                <UploadVideo
                name="lectureVideo"
                label="lectureVideo"
                register={register}
                setValue={setValue}
                errors={errors}
                viewData={view? modalData.videoUrl:null}
                editData={edit? modalData.videoUrl:null}
                />

                <div className='w-[600px]'>
                    <label className='text-sm font-inter text-[14px] text-richblack-50'>Lecture Title<sup className='text-pink-400'>*</sup></label>
                    <input id="lectureTitle" placeholder='Enter Lecture Title' {...register("lectureTitle",{required:true})} className='w-full h-[48px] p-[12px] rounded-md bg-richblack-600  text-richblack-50 '></input>
                    {
                        errors.lectureTitle&&(
                            <span>
                                Lecture Titl is required
                            </span>
                        )
                    }
                </div>

                <div className='w-[600px]'>
                    <label className='text-sm font-inter text-[14px] text-richblack-50'>Lecture Description<sup className='text-pink-400'>*</sup></label>
                    <textarea id="lectureDesc" placeholder='Enter Lecture Description' {...register("lectureDesc",{required:true})} className='w-full min-h-[130px] p-[12px] rounded-md bg-richblack-600  text-richblack-50'></textarea>
                    {
                        errors.lectureDesc&&(
                            <span>
                                Lecture Description is Required
                            </span>
                        )
                    }
                </div>

                {
                    !view && (
                        
                        <div >

                            {/* <button type='button' onClick={()=>{
                                setValue("lectureTitle","")
                                setValue("lectureDesc","");
                                setValue("lectureVideo","")
                            }}>
                                Cancel
                            </button> */}
                            <button type='submit' className='h-[48px] w-[128px] flex items-center justify-center bg-yellow-50 rounded-xl text-richblack-900'>
                                {edit?"Save Changes":"Save"}
                            </button>
                        </div>
                    )
                }
            </form>
            </div>
        </div>
   
  )
}
