import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table,Thead,Tr,Th, Tbody, Td } from 'react-super-responsive-table';
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints } from '../../services/apis';
import toast from 'react-hot-toast';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import { FaRegClock } from "react-icons/fa";
import { IoPencilSharp } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export const CourseTable = ({
  courses,setCourses,getInstructorCourses
}) => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  console.log(courses);
  const {token}=useSelector((state)=>state.auth);
  const [confirmationModal,setConfirmationModal]=useState(null);

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour:"numeric",
      minute:"numeric",
      second:"numeric",
      hour12:true,
      timeZone:"Asia/Kolkata"
    })

  }

  const convertToHour=(seconds)=>{

    return Math.floor(seconds/3600)

  }

  const convertToMinutes=(seconds)=>{
    return Math.floor(seconds/60);
  }

  const deleteAllHandler=async(courses,token)=>{
     
    for(let i=0;i<courses.length;i++){

      const result=await apiConnector("DELETE",courseEndpoints.DELETE_COURSE_API,{courseId:courses[i]._id,token});

    }

    toast.success("course deleted successfully");
    setConfirmationModal(null);
    getInstructorCourses(token);


  }
  return (
    <div className='text-white'>

    <Table className="w-[100%] flex flex-col items-center justify-center">
      <Thead className="w-[100%]">
        <Tr className="w-[100%] flex justify-between">
          <Th className="w-[100px] flex justify-start text-sm font-inter text-[14px]  text-richblack-100">
            Courses
          </Th>
          <div className='w-[calc(100%-767px)] flex justify-between'>
          <Th className="w-[102px] h-[54px] flex items-center justify-between text-sm font-inter text-[14px]  text-richblack-100">
          Duration
          </Th>
          <Th className="w-[102px] h-[54px] flex items-center justify-between ml-[10px] text-sm font-inter text-[14px]  text-richblack-100">
           Price
          </Th>
          <Th className="w-[102px] h-[54px] flex items-center justify-between text-sm font-inter text-[14px]  text-richblack-100">
            Actions
          </Th>
          </div>
        </Tr>
      </Thead>
      <Tbody className="w-[100%] flex flex-col items-center justify-center mt-[10px]">
        {
          courses.length===0 ?(
            <Tr>
              <Td className="font-semibold text-xl text-[50px] text-richblack-300">
                No Courses Found
              </Td>
            </Tr>
          ):(
            courses.map((course)=>{
              let sum=0;
              return(

              <Tr className="flex justify-between">
                <Td className="w-[767px] h-[180px] flex items-center justify-start">
                  <img className='flex w-[221px] h-[148px] mr-[10px] rounded-xl' src={course?.thumbNail}></img>
                  <div className='w-[490px] h-[148px] flex flex-col items-start '>
                    <p className='mb-[12px] text-xl font-semibold font-inter text-[20px] text-richblack-5'>{course.courseName}</p>
                    <p className='mb-[12px] text-sm font-inter text-[14px] text-richblack-100'>{course.courseDescription}</p>
                    <p className='mb-[12px] font-medium font-inter text-xs text-[12px] text-richblack-25'>Created: {formattedDate(course.createdAt)}</p>
                    {
                      course.status==="Draft"?(
                        <div className='flex w-[95px] h-[24px] items-center justify-center bg-richblack-700 rounded-full gap-x-2'>
                            <FaRegClock className='text-pink-50'/>

                            <p className='text-pink-50 text-xs font-inter text-[12px]'>Drafted</p>
                        </div>
                      ):(
                      <div className='flex w-[95px] h-[24px] items-center justify-center bg-richblack-700 rounded-full gap-x-2'>
                        <TiTick className='text-yellow-50'/>
                        <p className='text-yellow-50 text-xs font-inter text-[12px]'>Published</p>
                      </div>
                      )
                    }
                  </div>
                </Td>

                    <div  className='w-[calc(100%-770px)] flex justify-between'>
                    <Td className="w-[110px] h-[54px] flex items-center justify-between">
               <div className='font-medium text-sm text-[14px] text-richblack-100'>
                    <div className='text-md font-medium text-richblack-50 text-[16px]'>
                    {

                                  course.courseContent.map((courseC)=>{

                                    
                                      courseC.subSection.map((subS)=>{
                                        sum+=Math.floor(subS.timeDuration)


                                        
                                      })

                                      
                                    
                                      


                                    
                                  })



                                  }

                                  
                                    {convertToHour(sum)} hours {convertToMinutes(sum)} mins {sum%60} secs
                                  
                  </div>
               
               </div>
               
               </Td>

               <Td className="w-[102px] h-[54px] flex items-center justify-between ml-[10px]">
                <div className='font-medium text-sm text-[14px] text-richblack-100'>₹ {course.price}</div>
                
               </Td>
                    <Td className="w-[80px] h-[54px] flex items-center justify-between">
                      <button onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}>
                        <IoPencilSharp className='w-[22px] h-[22px] text-richblack-400 '/>
                      </button>
                      <button onClick={()=>{
                        setConfirmationModal({
                          text1:"Do You want To Delete this course",
                          text2:"All data related to this course will be deleted",
                          btn1Text:"Delete",
                          btn2Text:"Cancel",
                          btn1Handler:async()=>{
                            const result=await apiConnector("DELETE",courseEndpoints.DELETE_COURSE_API,{courseId:course._id,token});
                            toast.success("course deleted successfully");
                            setConfirmationModal(null);
                            getInstructorCourses(token);
                            
                            //navigate("/dashboard/my-courses");
                            
                          },
                          btn2Handler:()=>setConfirmationModal(null)

                        })
                      }}>
                    <RiDeleteBin5Line className='w-[22px] h-[22px] text-richblack-400'/>
                      </button>
                    </Td>
                    </div>


              </Tr>

              
               
              )
            })
          )
        }
      </Tbody>
    </Table>
        {
          courses.length!==0 && (
            <button onClick={()=>{
              setConfirmationModal({
                text1:"Do You want To Delete entire course",
                text2:"All Courses will be deleted",
                btn1Text:"Delete",
                btn2Text:"Cancel",
                btn1Handler:()=>deleteAllHandler(courses,token)
                  ,
                  //navigate("/dashboard/my-courses"),
                btn2Handler:()=>setConfirmationModal(null)

              })
            }} className='w-full flex justify-end '>
             <div className='flex items-center justify-center w-[100px] h-[40px] bg-yellow-50 text-richblack-900 font-semibold rounded-lg'> Delete All</div>
            </button>)
        }

    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        
    </div>
  )
}
