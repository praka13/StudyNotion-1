import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowForward } from "react-icons/io";
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { apiConnector } from '../../../../services/apiconnector';
import { courseEndpoints } from '../../../../services/apis';
import { MdArrowBackIosNew } from "react-icons/md";
import { NestedView } from './NestedView';

export const CourseBuilderForm = () => {

  const {register,
  handleSubmit,
  setValue,
  formState:{errors}}=useForm();

  const {courses}=useSelector((state)=>state.course);
  const dispatch=useDispatch();

  const [editSectionName,setEditSectionName]=useState(null);
  const [loading,setLoading]=useState(false);
  const {token}=useSelector((state)=>state.auth)

  const updateSection=async(data,token)=>{
    try{
      const result=await apiConnector("POST",courseEndpoints.UPDATE_SECTION_API,data,{
        "Content-Type": "multipart/form-data",
        Authorisation: `Bearer ${token}`,
      })

      console.log(result)
      dispatch(setCourse(result.data.data));
      setEditSectionName(null);
      setValue("sectionName","");
      
     

    }
    catch(err){

      console.log(err);

    }
  }

  const createSection=async(data,token)=>{
    try{

      console.log(token);

      const result=await apiConnector("POST",courseEndpoints.CREATE_SECTION_API,data,{
        "Content-Type": "multipart/form-data",
        Authorisation: `Bearer ${token}`,
      })

      console.log(result);

      dispatch(setCourse(result.data.data));
      //setEditSectionName(null)
      setValue("sectionName","")
      
     

     

      toast.success("Section Created Successfully");
     

    }
    catch(err){
      console.log(err);
      toast.error("Section not created")

    }
  }
  const cancelEdit=()=>{
    //console.log("Hello");
    setEditSectionName(null);
    //console.log(editSectionName);
    setValue("sectionName","")
  }

  const goBack=()=>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true))

  }

  const goToNext=()=>{
    if(courses?.courseContent.length===0){
      toast.error("Please Add Altleast One Section");
      return
    }
    if(courses?.courseContent.some((section)=>section.subSection.length===0)){
      toast.error("Please Add atleast one Subsection");
      return
    }
    dispatch(setStep(3));
  }

  // const handleChangeEditSectionName=()=>{
  //   return
  // }

  const handleChangeEditSectionName=(sectionId,sectionName)=>{

    if(editSectionName===sectionId){
      console.log("Hello");
      cancelEdit();
      return
    }
    else if(editSectionName===null){
      console.log("Hello");
      setEditSectionName(sectionId);
      setValue("sectionName",sectionName);
    }
  }

  const onSubmit=async (data)=>{

  

    //setLoading(true);
    if(editSectionName){
      const formData=new FormData();
      formData.append("sectionName",data.sectionName);
      formData.append("sectionId",editSectionName);
      formData.append("courseId",courses?._id);
      await updateSection(formData,token)
    }
    else{

      const formData=new FormData();
      formData.append("sectionName",data.sectionName);
      formData.append("courseId",courses?._id);
      await createSection(formData,token);


 


    }

    

    


  }
  return (
    <div className='h-fit bg-richblack-800 w-[640px] rounded-md p-[24px] ml-[40px] text-white' >

      <p className='font-semibold font-inter text-[24px] text-richblack-5 '>Course Builder</p>


        {courses?.courseContent.length>0 && (
          <NestedView  handleChangeEditSectionName={handleChangeEditSectionName}/>
  )}

<form onSubmit={handleSubmit(onSubmit)} className='mt-[20px]'>
        <div>
    
          <input  id='sectionName' placeholder='Add a Section to Build your Course' {...register("sectionName",{required:true})} className='p-[12px] text-richblack-200 w-full h-[48px] bg-richblack-700 rounded-md'/>
          {
            errors.sectionName && (
              <span>
                sectionName Is Required
              </span>
            )
          }
        </div>
        <div className='mt-10 flex items-center justify-start gap-3'>
          <button type='submit' className=' flex items-center justify-start gap-1'>
            <div className='w-[188px] h-[48px] flex items-center justify-center gap-3 border-yellow-50 border rounded-md text-yellow-50 font-medium text-[16px]'>

            {
              !editSectionName && (<MdAddCircleOutline fontSize={32}/>)
            }
            {
              editSectionName?(<div>Edit Section Name</div>):(<div>Create Section</div>)
            }
            
                       
            </div>

            
          </button>
          {
            editSectionName && (
              <button type='button' onClick={cancelEdit} className='text-sm text-richblack-300 underline'>
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>

  <div className='flex justify-end gap-x-3 items-center'>
    <button onClick={goBack} className='rounded-md cursor-pointer flex items-center justify-center w-[112px] h-[48px] bg-richblack-600 gap-x-2'>
      <MdArrowBackIosNew/>
      Back
    </button>
    <button onClick={goToNext}  className='rounded-md cursor-pointer flex items-center justify-center w-[112px] h-[48px] bg-yellow-200 text-richblack-600 gap-x-2'>
      Next
      <IoIosArrowForward/>
    </button>

  </div>


    </div>
  )
}
