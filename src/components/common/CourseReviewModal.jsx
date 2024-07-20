import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints } from '../../services/apis';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";

export const CourseReviewModal = ({setReviewModal}) => {

    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const {courseEntireData}=useSelector((state)=>state.viewCourse)

    const{
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    }=useForm();

    const createRating=async(formData,token)=>{
        console.log(token);
        try{


            const result=await apiConnector("POST",courseEndpoints.CREATE_RATING_API,formData,{

                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,

            })
            console.log(result);
            toast.success("Reviewed Successfully");

        }
        catch(err){

            console.log(err);
            toast.error("Can't review course");

        }
    }

    const onSubmit=async(data)=>{

        const formData=new FormData();
        console.log(data.courseRating);
        formData.append("rating",data.courseRating);
        formData.append("review",data.courseExperience);
        formData.append("courseId",courseEntireData?._id);
        console.log(token);

        await createRating(formData,token);

        setReviewModal(false);

        

    }

    useEffect(()=>{
        setValue("courseExperience","");
        setValue("courseRating",0);
    },[]);

    const ratingChanged=(newRating)=>{

        setValue("courseRating",newRating)

    }



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm">
        <div className='w-[665px]'>
            {/* Modal Header */}
            <div className='h-[58px] w-full py-[16px] px-[24px] flex justify-between bg-richblack-700 items-center rounded-t-xl border-b-richblack-25 border-b-[1px]'>
            <p className='font-semibold text-lg font-inter text-[18px] text-richblack-5'>Add Review</p>
            <button className='font-semibold text-lg font-inter text-[18px] text-richblack-5'
            onClick={()=>setReviewModal(false)}
            ><RxCross2/></button>
            </div>
            {/* Modal Body */}

            <div className='h-[449px] w-full p-[32px] bg-richblack-800 rounded-b-xl'>
                <div className='w-[601px] h-[52px] flex items-center justify-center gap-x-[12px]'>
                    <img
                        src={user?.image}
                        className='aspect-square w-[50px] h-[50px] rounded-full'
                    />
                    <div className='flex flex-col'>
                        <p className='font-semibold font-inter text-[16px] text-richblack-5'>{user?.firstName} {user?.lastName}</p>
                        <p className='font-normal font-inter text-[14px] text-richblack-5'>Posting Publicly</p>
                    </div>
                </div>


                <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col '
                >

                    <div className='h-[42px] w-[601px] flex items-center justify-center mt-[24px]'>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        

                    />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='courseExperience' className='font-normal text-richblack-5 text-[14px]'>
                            Add Your Experience<sup className='text-pink-200'>*</sup>
                        </label>
                        <textarea
                        className='w-[601px] h-[139px] mt-[12px] bg-richblack-600 p-[12px] rounded-xl text-richblack-100'
                        id="courseExperience"
                        placeholder='Add Your Experience Here'
                        {...register("courseExperience",{required:true})}
                        
                        >
                        

                        </textarea>
                        {
                            errors.courseExperience && (
                                <span>
                                    Please Add Your Experience
                                </span>
                            )
                        }
                    </div>

                    <div className='w-[601px] h-[80px] mt-[20px] bg-richblack-800 flex justify-end gap-x-[20px]'>
                        <button onClick={()=>setReviewModal(false)} className='w-[101px] h-[48px] px-[12px] py-[24px] bg-richblack-700 flex items-center justify-center rounded-xl text-richblack-5'>

                            Cancel

                        </button>
                        <button type='submit'  className='w-[101px] h-[48px] px-[12px] py-[24px] bg-yellow-50 flex items-center justify-center rounded-xl text-richblack-900'>

                            Save

                        </button>
                    </div>

                </form>
            </div>
        </div>

    </div>
  )
}
