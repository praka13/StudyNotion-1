import React from 'react'
import HighLightText from './HighLightText';
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import compareWithOthers from "../../../assets/Images/Compare_with_others.png";
import planYourLessons from "../../../assets/Images/Plan_your_lessons.png";
import Button from './Button';

export const LearningLanguageSection = () => {
  return (
    <div>
        <div className="flex flex-col gap-5 mt-[150px] items-center justify-center">

            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for <HighLightText text={"learning any language"} textColor={"text-blue-200"}/>
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base mt-1 font-medium w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-row items-center justify-center mt-5'>
                <img src={knowYourProgress} alt="knowYourProgress" className='object-contain -mr-32'/>
                <img src={compareWithOthers} alt="comparewithOthers" className='object-contain'/>
                <img src={planYourLessons} alt="planYourLessons" className='object-contain -ml-32'/>


            </div>

            <div className='w-fit mb-16'>
                <Button active={true} linkto={"/signUp"}>
                    <div>
                        Learn More
                    </div>
                </Button>
            </div>


        </div>
    </div>
  )
}
