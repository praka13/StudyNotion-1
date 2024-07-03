import React from 'react';
import InstructorImage from "../../../assets/Images/Instructor.png"
import HighLightText from './HighLightText';
import Button from './Button';
import { FaArrowRight } from 'react-icons/fa';

export const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-20 items-center'>
            <div className='w-[50%] '>
                <img src={InstructorImage} alt='instructorImage' className='shadow-white'></img>
            </div>

            <div className='w-[50%] flex flex-col gap-10'>

                <div className='text-4xl text-white font-semibold w-[50%]'>
                    Become an
                    <HighLightText text={"Instructor"} textColor={"text-blue-200"}/> 
                </div>

                <div className=' font-medium text-[16px] w-[80%] text-richblack-300'>
                    <p>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                </div>
                <div className='w-fit'>

                <Button active={true} linkto={"/signUp"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Learning Today
                        <FaArrowRight/>
                    </div>
                </Button>

                </div>
               

            </div>

        </div>
    </div>
  )
}
