import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowDropDown } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { apiConnector } from '../../../../services/apiconnector';
import { courseEndpoints } from '../../../../services/apis';
import { setCourse } from '../../../../slices/courseSlice';
import {ConfirmationModal} from "../../../common/ConfirmationModal";
import toast from 'react-hot-toast';
import { FaAngleDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { SubSectionModal } from './SubSectionModal';
import { CiCircleList } from "react-icons/ci";
import { FaAngleUp } from "react-icons/fa";
import { setUser } from '../../../../slices/profileSlice';




export const NestedView = ({handleChangeEditSectionName}) => {

    const {courses}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const [up,setup]=useState(false);

    const deleteSection=async()=>{

 
    
    }

    const deleteHandler=async(sectionId)=>{
        const formData=new FormData();
        console.log(sectionId);
        console.log(courses?._id);
        formData.append("sectionId",sectionId);
        formData.append("courseId",courses?._id);

        console.log(formData)

        await deleteSection(formData,token);
    }

    const[addSubSection,setAddSubSection]=useState(null);
    const[viewSubSection,setViewSubSection]=useState(null);
    const[editSubSection,setEditSubSection]=useState(null);
    const[confirmationModal,setConfirmationModal]=useState(null);
  return (
    <div className='mt-[20px]'>
        <div className='rounded-lg bg-richblack-700 p-6 px-4'>
            {courses?.courseContent?.map((section)=>{
                return(
                    <details key={section._id} open className='gap-y-20'>

                    <summary className='flex items-center justify-between gap-x-3 border-b-[1px] border-richblack-600 h-[48px]' >
                        <div className='flex items-center gap-x-1.5 font-semibold font-inter text-[16px] text-richblack-50'>
                            <CiCircleList  className='w-[30px] h-[30px] text-richblack-400'/>
                            
                            <p >{section.sectionName}</p>
                        </div>
                        <div className='flex gap-x-2'>
                            <button className=' text-richblack-400' onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}>
                                <MdEdit className='w-[30px] h-[30px]'/>
                            </button>

                            <button
                            onClick={()=>{
                                setConfirmationModal({
                                    text1:"Delete this Section",
                                    text2:"All the Lectures in this section will be deleted",
                                    btn1Text:"Delete",
                                    btn2Text:"Cancel",
                                    btn1Handler:async()=>{
                                        try{
                                            const result=await apiConnector("DELETE",courseEndpoints.DELETE_SECTION_API,{sectionId:section._id,courseId:courses?._id,token})
                                    
                                            console.log(result);
                                       
                                            toast.success("Section Deleted Successfully");

                                            setConfirmationModal(null);
                                            dispatch(setCourse(result.data.data));
                                        }
                                        catch(err){
                                            toast.error("Section Not Deleted")
                                        }
                                    },
                                    btn2Handler:()=>setConfirmationModal(null),

                                })
                            }}
                            className=' text-richblack-400'
                            >
                                <MdDelete className='w-[30px] h-[30px]'/>
                            </button>
                            <span>|</span>
                        
                            
                               <FaAngleDown className={`w-[30px] h-[30px] text-richblack-300`}/>
                            
                          
                            
                        </div>
                    </summary>

                    <div>
                        {
                            section.subSection.map((data)=>{
                                return(
                                    <div key={data?._id}
                                    
                                    className='flex items-center justify-between gap-x-2 h-[46px]'
                                    >
                                    <button className='flex gap-2' onClick={()=>setViewSubSection(data)}>
                                    <CiCircleList  className='w-[25px] h-[25px] text-richblack-400 ml-[13px]'/>
                                          {data?.title}
                                        
                                       </button>
                                        
                                        <div className='flex items-center gap-x-3'>
                                                <button className=' text-richblack-400' onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                                                <MdEdit className='w-[30px] h-[30px]'/>
                                                </button>

                                                <button className=' text-richblack-400'
                                                onClick={()=>{

                                                    setConfirmationModal({
                                                        text1:"Delete this Sub Section",
                                                        text2:"Selected Lecture will be deleted",
                                                        btn1Text:"Delete",
                                                        btn2Text:"Cancel",
                                                        btn1Handler:async()=>{
                                                            try{
                                                                const result=await apiConnector("DELETE",courseEndpoints.DELETE_SUBSECTION_API,{subSectionId:data._id,courseId:courses?._id,token})
                                                        
                                                                console.log(result);
                                                           
                                                                toast.success("SubSection Deleted Successfully");
                    
                                                                setConfirmationModal(null);
                                                                dispatch(setCourse(result.data.data));
                                                            }
                                                            catch(err){
                                                                toast.error("Section Not Deleted")
                                                            }
                                                        },
                                                        btn2Handler:()=>setConfirmationModal(null),
                    
                                                    })

                                                }}
                                                >
                                                        <MdDelete className='w-[30px] h-[30px]'/>
                                                </button>
                                        </div>
                                        
                                    </div>
                                    

                                    

                                )
                            })
                        }


                    <button className="flex text-yellow-50 items-center justify-center h-[56px] gap-x-[4px]" onClick={()=>setAddSubSection(section._id)}>
                            <FaPlus/>
                           <p className='font-medium font-inter'>Add Lecture</p> 

                        </button>
                      

                        
                    </div>

                   

                </details>
                )
            })}
        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/> }

        {addSubSection && (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>)}
        {viewSubSection&&(<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>)}
        {editSubSection&&(<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>)}


    </div>
  )
}
