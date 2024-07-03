import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { CourseInformationForm } from './CourseInformationForm';
import { CourseBuilderForm } from './courseBuilder/CourseBuilderForm';
import { PublishCourse } from './PublishCourse/PublishCourse';
import { setStep } from '../../../slices/courseSlice';

export const RenderSteps = () => {

    const dispatch=useDispatch();

    const {step}=useSelector((state)=>state.course)

    const steps=[
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        },
    ]
  return (
    <div className='h-full w-full'>
<div  className='w-[665px] h-[68px] flex flex-col items-center justify-center mb-16'>
<div className='flex ml-[100px]'>
            {steps.map((item)=>{
                return(
                    <div className='w-[220.33px] h-[45px] mt-[90px] flex items-center justify-center '>
                        <div>
                       
                            <div className={`${step===item.id ? "bg-yellow-900 border-yellow-50"
                            :"border-richblack-700 bg-richblack-800 text-richblack-300"} w-[38px] h-[38px] rounded-full flex items-center justify-center` }>
                              
                                {
                                    
                                    step>item.id?(<FaCheck/>):(item.id)
                                    
                                }
                                
                            </div>
                           
                        </div>
                                {/* Add code for dashes between the labels */}

                        <div className='w-[182.5px]'>

                        {
                                item.id===3?(<div></div> ):((step===item.id ) ? (<div className='border-t-2 border-dashed border-richblack-400 my-4'></div>):(<div className={`${step!==1?"border-t-2 border-dashed border-yellow-400 my-4":"border-t-2 border-dashed border-richblack-400 my-4"}`}></div>))

                                }
                        </div>
                        
                    </div>
                    
                )
            })}
            

        </div>

        <div className='flex justify-center items-center ml-[85px]'>
                {steps.map((item)=>{
                   return( <div>
                        <div  className='w-[220.33px] h-[68px]'>
                            <p className={`text-sm font-inter text-[14px] ${step===item.id ? "text-richblack-5":"text-richblack-500"}`}>{item.title}</p>
                        </div>
                    </div>)
                })}
            </div>
</div>


            {step===1 && <CourseInformationForm/>}
            {step===2 && <CourseBuilderForm/>}
            {step===3 && <PublishCourse/>}



    </div>
  )
}
