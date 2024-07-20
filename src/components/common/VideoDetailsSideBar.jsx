import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
//import viewCourseSlice from '../../slices/viewCourseSlice';
import { useSelector } from 'react-redux';

export const VideoDetailsSideBar = ({setReviewModal}) => {

    const [activeStatus,setActiveStatus]=useState("");
    const [videoBarActive,setVideoBarActive]=useState("");
    const navigate=useNavigate();
    const location=useLocation()
    const {sectionId,subSectionId}=useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    }=useSelector((state)=>state.viewCourse)

    useEffect(()=>{
      ;(()=>{
        if(!courseSectionData.length){
          return
        }
        const currentSectionIndex=courseSectionData.findIndex(
          (data)=>data._id===sectionId
        )
        const currentSubSectionIndex=courseSectionData?.[currentSectionIndex]?.subSection.
                                      findIndex(
                                        (data)=>data._id===subSectionId
                                      )
        const activeSubSectionId=courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

        //set Current Section Here
        setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
        console.log(courseSectionData?.[currentSectionIndex]?._id);
        //set Current sub-Section Here
        setVideoBarActive(activeSubSectionId);

      })()
    },[courseSectionData,courseEntireData,location.pathname])
  return (
    <div className='bg-richblack-700 min-h-full '>
      <div >
        {/* for buttons and Headings */}
        <div className='flex justify-between gap-x-[20px] px-[30px] py-[5px]'>

          <div onClick={()=>navigate("/dashboard/enrolled-courses")} className='bg-richblack-800 h-[48px] w-[101px] flex items-center justify-center rounded-md text-richblack-5'>
            Back
          </div>

          <button onClick={()=>setReviewModal(true)} className='bg-yellow-50 h-[48px] w-[101px] flex items-center justify-center rounded-md text-richblack-900'>
            Add Review
          </button>

        </div>
        <div className='px-[30px] py-[5px]'>
          <p className='mt-[5px] font-semibold text-[20px] text-richblack-5'>{courseEntireData?.courseName}</p>
          <p className='mt-[5px] font-inter font-normal text-[16px] text-richblack-5'>{completedLectures?.length}/{totalNoOfLectures}</p>

        </div>

        {/* for sections and SubSections */}

        <div className='mt-[5px] rounded-xl'>
          {
            courseSectionData.map((section,index)=>{
              return(
                <div 
                onClick={()=>setActiveStatus(section?._id)}
                key={index}
                >
                  {/* section */}

                  <div>
                    <div className='h-[30px] w-full bg-richblack-800 p-[20px] flex items-center font-inter font-semibold text-richblack-5'>
                      {section?.sectionName}
                    </div>

                    {/* HW-add arrow Icon Here */}
                  </div>

                  {/* subSections */}
                  <div>
                    {
                      activeStatus===section?._id && (
                        <div className='gap-y-[10px]'>
                          {
                            section.subSection.map((topic,index)=>{
                              return(
                                <div key={index}
                                className={`${videoBarActive===topic?._id?"bg-yellow-200 text-richblack-200":"bg-richblack-900 text-white"}`}
                                onClick={()=>{
                                  navigate(`view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                  setVideoBarActive(topic?._id)
                                }}>
                                <input
                                type='checkbox' className='mr-[10px] ml-[18px]'
                                checked={completedLectures.includes(topic?._id)}
                                onChange={()=>{}}
                                ></input>
                                <span className='text-richblack-5 '>
                                  {topic.title}
                                </span>
                              </div>
                              )
                            })
                          }
                        </div>
                      )

                    }
                  </div>

                </div>

              )
            })
          }
        </div>
      </div>

    </div>
  )
}
