import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RatingStars } from './common/RatingStars'
import getAvgRating from '../utils/getAvgRating';


export const Course_Card = ({course}) => {


    const[avgReviewCount,setReviewCount]=useState(0);

    useEffect(()=>{
        const count=getAvgRating(course?.ratingandReviews);
        console.log(count);
        setReviewCount(count)

    },[course]);
  return (
    <div>
       
            <div>
                <div>
                <Link to={`/course/${course._id}`}>  <img className='w-[300px] h-[201px] rounded-xl' src={course?.thumbNail}/> </Link>
                </div>
                <div className='mt-[8px]'>
                    <p className='font-medium text-[16px] text-richblack-5'>{course?.courseName}</p>
                    <p className='font-medium text-[16px] text-richblack-5'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className='flex gap-x-2'>
                        <span>{avgReviewCount}</span>
                        <RatingStars ReviewCount={avgReviewCount}/>
                        <span>{course?.ratingandReviews?.length} Ratings</span>
                    </div>
                    <p>₹ {course?.price}</p>
                </div>

            </div>
       
    </div>
  )
}
