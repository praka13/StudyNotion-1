import React from 'react';
import { RenderSteps } from './RenderSteps';
import { AiFillThunderbolt } from "react-icons/ai";


export const AddCourse = () => {
  return (
        <div className='h-full w-full mb-[100px] flex'>
                <div className="text-white" >
        <div className='flex'>
            <div>
                <h1 className='font-semibold text-[30px] ml-[10px]'>Add Course</h1>
              
                <RenderSteps/>
                
            </div>
            <div className='w-[384px] h-[390px] ml-[30px] bg-richblack-700 p-[24px] gap-[9px] mt-[20px] flex flex-col items-start rounded-md mx-auto'>
                <p className='flex items-center justify-center gap-[5px] text-lg font-inter text-[18px] '><AiFillThunderbolt className='text-yellow-100'/>Course Upload Tips</p>
                    <ul className='gap-[11px] list-disc text-xs font-inter text-[12px] '>
                        <li className='mb-[11px]'>Set the Course Price option or make it free.</li>
                        <li className='mb-[11px]'>Standard size for the course thumbnail is 1024x576.</li>
                        <li className='mb-[11px]'>Video section controls the course overview video.</li>
                        <li className='mb-[11px]'>Course Builder is where you create & organize a course.</li>
                        <li className='mb-[11px]'>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li className='mb-[11px]'>Information from the Additional Data section shows up on the course single page.</li>
                        <li className='mb-[11px]'>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                
            </div>
        </div>
    </div>
        </div>
  )
}
