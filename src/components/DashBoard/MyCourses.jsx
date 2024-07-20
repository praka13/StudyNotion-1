import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CourseTable } from './CourseTable';
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints } from '../../services/apis';
import { IoIosAddCircleOutline } from "react-icons/io";

export const MyCourses = () => {

    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();

    const [loading,setLoading]=useState(false);
    const [courses,setCourses]=useState([]);

    const getInstructorCourses=async(token)=>{

      setLoading(true);


      const result=await apiConnector("POST",courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,null,{

        "Content-Type": "multipart/form-data",
        Authorisation: `Bearer ${token}`,

      })
      const final=result.data.data.courses
      console.log(result.data.data.courses);
      setCourses(final);
      setLoading(false);
      console.log(courses)
    }

    useEffect(()=>{

      getInstructorCourses(token);
        
    },[])
  return (
    <div>
      {
        loading?(<div className='h-[600px] w-[1200px] flex items-center justify-center text-richblack-5 text-[35px]'>Loading.....</div>):(    <div className={`${courses.length<=1 ? "h-screen":"h-fit"} p-[30px] mt-0`}>
        <div className='flex items-start justify-between w-full h-[120px]'>
            <h1 className='font-medium font-inter text-[30px] text-richblack-5'>My Courses</h1>
            <button onClick={()=>navigate("/dashboard/add-course")} className='bg-yellow-50 w-[159px] h-[48px] flex items-center justify-center gap-x-2 rounded-xl'>
              <IoIosAddCircleOutline/>
              Add Course
              </button>
        </div>
        
        {courses && <CourseTable courses={courses} setCourses={setCourses} getInstructorCourses={getInstructorCourses}/>}
    </div>)
      }
    </div>
  )
}
