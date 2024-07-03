import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CourseTable } from './CourseTable';

export const MyCourses = () => {

    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const {user}=useSelector((state)=>state.profile);
    const [courses,setCourses]=useState([]);

    useEffect(()=>{
        setCourses(user?.courses);
    },[])
  return (
    <div className='h-screen'>
        <div>
            <h1>My Courses</h1>
            <button onClick={()=>navigate("/dashboard/add-course")}>Add Course</button>
        </div>
        
        {courses && <CourseTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}
