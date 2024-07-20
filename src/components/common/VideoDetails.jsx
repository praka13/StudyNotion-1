import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; 
import { FaPlayCircle } from "react-icons/fa";
import { apiConnector } from '../../services/apiconnector';
import { courseProgressEndPoints } from '../../services/apis';
import toast from 'react-hot-toast';

export const VideoDetails = () => {


    const{courseId,sectionId,subSectionId}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const playerRef=useRef();
    const location=useLocation();

    const createCourseProgress=async()=>{

        try{

            const result=await apiConnector("POST",courseProgressEndPoints.CREATE_COURSE_PROGRESS_API,{courseId:courseId},{

                Authorisation: `Bearer ${token}`,

            })

            console.log(result);

        }
        catch(err){

            console.log(err);

        }

    }

    const addSubSection=async()=>{
        try{
            const result=await apiConnector("POST",courseProgressEndPoints.ADD_SUB_SECTION,{courseId:courseId,subSectionId:subSectionId},{
                Authorisation: `Bearer ${token}`,
            })
            console.log(result);

        }
        catch(err){

            console.log(err);
                
        }
    }
    const {token}=useSelector((state)=>state.auth);

    const{courseSectionData,courseEntireData,completedLectures}=useSelector((state)=>state.viewCourse);

    const[videoData,setVideoData]=useState([]);
    const[videoEnded,setVideoEnded]=useState(false);
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
        const setVideoSpecificDetails=async()=>{
            console.log("Hello")
            if(courseSectionData.length===0){
                console.log("hqwe");
                return
            }
            if(!courseId && !sectionId && !subSectionId){
                navigate("/dashboard/enrolled-courses")
            }

            else{
                //lets assume all 3 fields are present
                const filteredData=courseSectionData.filter(
                    (section)=>section._id===sectionId
                )

                console.log(filteredData);

                const filteredVideoData=filteredData?.[0]?.subSection.filter(
                    (data)=>data._id===subSectionId
                )
                console.log(filteredVideoData);
                setVideoData(filteredVideoData[0]);
                console.log(videoData);
                setVideoEnded(false);
            }

        }
        setVideoSpecificDetails()
    },[courseSectionData,courseEntireData,location.pathname])

    const isFirstVideo=()=>{

        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )

        const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )

        if(currentSectionIndex===0 && currentSubSectionIndex===0){
            return true
        }

        else{
            return false
        }

        

    }

    const isLastVideo=()=>{

        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )

        const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length

        const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )
        
        if(currentSectionIndex===courseSectionData.length-1 && currentSubSectionIndex===noOfSubSections-1){
            return true
        }
        else{
            return false
        }


    }

    const goToNextVideo=()=>{

        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )

        const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length

        const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )

        if(currentSubSectionIndex!==noOfSubSections-1){
            //same section next video
            const nextSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex+1]._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }

        else{
            //different section first video

            const nextSectionId=courseSectionData[currentSectionIndex+1]._id;
            const nextSubSectionId=courseSectionData[currentSectionIndex+1].subSection[0]._id;

            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
        }



    }

    const goToPreviousVideo=()=>{

        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )

        const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length

        const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )

        if(currentSubSectionIndex!==0){
            console.log(currentSectionIndex);
            console.log(currentSubSectionIndex);
            const prevSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1]._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }

        else{
            //different section last video
            console.log(currentSectionIndex);

            const prevSectionId=courseSectionData[currentSectionIndex-1]._id;
            const prevSubSectionLength=courseSectionData[currentSectionIndex-1].subSection.length;
            const prevSubSectionId=courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLength-1]._id;

            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);



        }

    }

    const handleLectureCompletion=async()=>{

        await createCourseProgress();

        await addSubSection();

        toast.success("Marked as completed successfully");



    }


  return (
    <div className='text-black mt-[100px] mb-[100px]'>
        {
            !videoData?(<div>No Data Found</div>):(

                <Player ref={playerRef}  playsInline onEnded={()=>setVideoEnded(true)} src={videoData?.videoUrl}>

              
                   <div className="relative">
                   {
                    videoEnded && (
                        <div  className='flex gap-x-4 absolute items-center justify-center w-full mt-[10px]'>
                            {
                                !completedLectures.includes(subSectionId)&&(
                                    <button onClick={()=>handleLectureCompletion()} className='text-[18px]'>
                                        Mark as Completed 

                                    </button>
                                )
                            }

                            <button  className='text-[18px]' onClick={()=>{
                                if(playerRef?.current){
                                    playerRef.current?.seek(0);
                                    setVideoEnded(false);
                                }
                            }}>
                                Rewatch

                            </button>

                            <div className='text-[18px]'>
                                {
                                    !isFirstVideo() && 
                                    (
                                    <button  onClick={goToPreviousVideo}>
                                        Prev
                                    </button>
                                    )
                                }
                            </div>
                            <div className='text-[18px]'>
                                {
                                    !isLastVideo() && 
                                    <button onClick={goToNextVideo}>
                                        Next
                                    </button>
                                }
                            </div>
                        </div>
                    )
                   }

                   </div>


                </Player>

            )
        }
        <h1 className='text-richblack-5 text-[20px] mb-[5px] font-semibold'>
            {
                videoData?.title
            }
        </h1>
        <p  className='text-richblack-5 text-[16px] mb-[5px]'>
            
            {
                videoData?.description
            }
        </p>

    </div>
  )
}
