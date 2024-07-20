import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../../services/apiconnector';
import { courseEndpoints, settingsEndpoints } from '../../../services/apis';
import { InstructorChart } from './InstructorChart';
import { Link } from 'react-router-dom';
import { PiHandWavingFill } from "react-icons/pi";

export const Instructor = () => {

    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile)
    const [courses,setCourses]=useState([]);
    const [instructorCourses,setInstructorCourses]=useState([]);
    const [loading,setLoading]=useState(false);
   

    const getInstructorCoursesInfo=async()=>{

        try{
            setLoading(true);
            const result=await apiConnector("GET",settingsEndpoints.INSTRUCTOR_DASHBOARD,null,{
                Authorisation: `Bearer ${token}`,
            })

            console.log(result);
            setCourses(result.data.courses);
            setLoading(false);
            

        }
        catch(err){
            console.log(err);

        }

    }

    const getInstructorCourseDetails=async()=>{
        try{
            const result=await apiConnector("POST",courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,null,{
                Authorisation: `Bearer ${token}`,
            })
            console.log(result);
            setInstructorCourses(result.data.data.courses);

        }
        catch(err){
            console.log(err);
        }

    }

    useEffect(()=>{
        getInstructorCoursesInfo();
        getInstructorCourseDetails();
    },[])

    const totalAmount=courses.reduce((acc,curr)=>{
        return acc+curr.totalAmountGenerated
    },0);
    console.log(totalAmount);

    const totalStudents=courses.reduce((acc,curr)=>{
        return acc+curr.totalStudentsEnrolled
    },0)
    console.log(totalStudents);

  return (
    <div className='h-fit mb-[20px] text-white p-[50px]'>
        <div>
        <div className='flex gap-x-1 items-center text-[25px] text-richblack-5 font-semibold mb-[5px]'>Hi,{user?.firstName} <PiHandWavingFill className='text-yellow-50'/></div>
        <p className='text-[16px] text-richblack-200'>Let's start something New</p>
        </div>

        {
            loading?(<div>Loading....</div>):courses.length>0?(<div>
                <div className='flex w-fit h-fit items-start justify-start mt-[15px] gap-x-[125px] '>
                    <div className='w-fit h-fit bg-richblack-700 p-[20px] rounded-xl '>
                    <InstructorChart courses={courses}></InstructorChart>
                    </div>
                    <div className='w-[250px] h-full bg-richblack-700 p-[30px] rounded-xl'>
                        <p className='text-richblack-5 font-bold text-[20px] mb-[10px]'>Statistics</p>
                        <div>
                            <p className='text-[20px] text-richblack-300 font-semibold font-inter'>Total Courses</p>
                            <p className='text-[32px] text-richblack-100 font-semibold font-inter'>{courses.length}</p>
                        </div>
                        <div >
                            <p className='text-[20px] text-richblack-300 font-semibold font-inter'>Total Students</p>
                            <p className='text-[32px] text-richblack-100 font-semibold font-inter'>{totalStudents}</p>
                        </div>
                        <div>
                            <p className='text-[20px] text-richblack-300 font-semibold font-inter'>Total Income</p>
                            <p className='text-[32px] text-richblack-100 font-semibold font-inter'>Rs.{totalAmount}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-[915px] h-fit bg-richblack-700 p-[20px] mt-[20px] rounded-xl'>
                    {/* Render 3 courses */}

                    <div className='flex justify-between '>
                        <p className='text-[20px] font-bold'>Your Courses</p>
                        <Link to="/dashboard/my-courses">
                            <p className='text-yellow-50 font-semibold'>View All</p>
                        </Link>
                    </div>
                    <div className='flex justify-between mt-[10px] '>
                        {
                        instructorCourses.slice(0,3).map((course,index)=>{
                            return(
                                <div>
                                    <img className='w-[270px] h-[200px] rounded-lg' src={course?.thumbNail}></img>
                                    <div className='mt-[10px]'>
                                        <p className='text-[20px] font-semibold text-richblack-5'>{course?.courseName}</p>
                                        <div className='flex gap-x-[10px] mt-[10px] text-richblack-5'>
                                        <p>{course?.studentsEnrolled?.length} students</p>
                                        <p> | </p>
                                        <p>Rs. {course?.price}</p>
                                        </div>

                                    </div>

                                </div>
                            )
                        })
                        }
                    </div>
                </div>

            </div>
            
            ):(<div>No Courses Found</div>)
        }


    </div>
  )
}
