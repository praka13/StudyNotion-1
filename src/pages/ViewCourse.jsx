import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { courseEndpoints } from '../services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { VideoDetailsSideBar } from '../components/common/VideoDetailsSideBar';
import { CourseReviewModal } from '../components/common/CourseReviewModal';


export const ViewCourse = () => {

    const [reviewModal,setReviewModal]=useState(false);
    const {courseId}=useParams();
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const getFullCourseDetails=async()=>{
        try{

            const result=await apiConnector("POST",courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId},{
                Authorisation: `Bearer ${token}`
            });
            console.log(result);
            dispatch(setCourseSectionData(result.data.data.courseDetails.courseContent));
            dispatch(setEntireCourseData(result.data.data.courseDetails));
            dispatch(setCompletedLectures(result.data.data.completedVideos));
            let lectures=0;
            result.data.data.courseDetails.courseContent.forEach((sec)=>{
                lectures+=sec.subSection.length;
            })
            dispatch(setTotalNoOfLectures(lectures));

        }
        catch(err){

            console.log(err);

        }
    }

    useEffect(()=>{
        getFullCourseDetails();
    },[]);
  return (
    <div className='h-fit'>
        <div className='flex'>
            <div className="w-[300px] min-h-screen">
            <VideoDetailsSideBar setReviewModal={setReviewModal}/>
            </div>

            <div className="w-11/12 h-fit">
                <Outlet/>
            </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </div>
  )
}
