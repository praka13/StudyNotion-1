import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints } from '../../services/apis';
import { setCourse, setEditCourse } from '../../slices/courseSlice';
import { RenderSteps } from './AddCourse/RenderSteps';

export const EditCourse = () => {

    const dispatch=useDispatch();
    const {courseId}=useParams();

    console.log(courseId);

    const {courses}=useSelector((state)=>state.course);

    const {token}=useSelector((state)=>state.auth);

    const getFullCoursesDetails=async(courseId,token)=>{
        try{

            const result=await apiConnector("POST",courseEndpoints.COURSE_DETAILS_API,{courseId,token});
            console.log(result.data.data);
            dispatch(setCourse(result.data.data));
            dispatch(setEditCourse(true));

        }
        catch(err){

            console.log(err);

        }
    }

    useEffect(()=>{

        getFullCoursesDetails(courseId,token);
   
    },[])
  return (
    <div className='text-white mb-[100px]'>
        <h1>Edit Course</h1>
        <div>
            {
                courses?(<RenderSteps/>):(<p>Course Not Found</p>)
            }
        </div>

    </div>
  )
}
