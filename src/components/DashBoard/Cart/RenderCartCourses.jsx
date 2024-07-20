import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeCart } from '../../../slices/cartSlice';
import ReactStars from "react-rating-stars-component"
import { RatingStars } from '../../common/RatingStars';
import { GoDotFill } from "react-icons/go";
//import getAvgRating from '../../../utils/getAvgRating';

export const RenderCartCourses = () => {

    function getAvgRating(ratingArray){
        if(ratingArray?.length===0){
            console.log(ratingArray);
            console.log(ratingArray?.length);
            console.log("Hello1");
            return 0
        }
        else{
          
            console.log(ratingArray);
            console.log(ratingArray?.length);
            console.log("Hello2");
            const getRating=ratingArray.reduce((acc,curr)=>{
                return acc+curr.rating

            },0)

            console.log(getRating)

        
        
            
        
            const avgRating=Math.round((getRating/ratingArray?.length)*10)/10;
            console.log(avgRating);
        
            return avgRating
        
        }
    }

    let courseIdArray=[];

    const {cart}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();

  return (
    <div>
        {
            cart.map((course,index)=>{

                // courseIdArray.push(course._id);
                // console.log(courseIdArray);
                //console.log(course?.ratingandReviews);
                return(
                    <div className='text-white px-[30px]'>

                           
                       <div className=' w-[792px] h-[148px] flex gap-[20px] mb-[20px] mt-[20px]'>

                       <img className='w-[185px] h-[148px] rounded-lg' src={course?.thumbNail}/>
                            <div className='w-[407px] h-[148px] flex flex-col justify-between'>
                                <p className='text-lg font-medium font-inter text-[18px]'>{course?.courseName}</p>
                                <p className='font-normal font-inter text-[16px] text-richblack-300'>{course?.category?.categoryName}</p>
                                <div className='flex items-center gap-[10px]'>
                                    <span className='font-semibold font-inter text-[16px] text-yellow-100'>{getAvgRating(course?.ratingandReviews)}</span>
                                    <RatingStars ReviewCount={getAvgRating(course?.ratingandReviews)}/>
                                    <span className='font-normal font-inter text-[16px] text-richblack-400'>{course?.ratingandReviews?.length} Reviews</span>


                                </div>
                                <div className='flex items-center gap-x-[8px] text-sm font-medium font-inter text-[14px] text-richblack-300'>Total Courses <GoDotFill/> Lesson <GoDotFill/> Beginner</div>
                            </div>
                        
                        <div className='w-[112px] h-[148px] flex flex-col items-center'>
                            <button
                            onClick={()=>dispatch(removeCart(course))}
                            className='flex w-[112px] h-[48px] items-center justify-center gap-x-[8px] bg-richblack-800 rounded-lg font-medium font-inter text-[16px] text-pink-200 mb-[20px]'>
                                <RiDeleteBin5Line/>
                                <span>Remove</span>
                            </button>

                            <p className='font-semibold text-[24px] font-inter text-yellow-50'>Rs. {course?.price}</p>
                        </div>
                       </div>

                        <div className='w-[792px] h-[1px] bg-richblack-300'></div>
                    </div>
                )
            })
        }

    </div>
  )
}
