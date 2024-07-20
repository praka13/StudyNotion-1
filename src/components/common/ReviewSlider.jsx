import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {FreeMode,Pagination,Autoplay,Navigation} from "swiper/modules";
import { RatingStars } from './RatingStars';
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints, ratingsEndpoints } from '../../services/apis';

export const ReviewSlider = () => {

    const [reviews,setReviews]=useState([]);
    const truncatedWords=15;

    const getAllReviews=async()=>{
        try{
            const result=await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
            console.log(result.data.data);
            setReviews(result.data.data)
        }
        catch(err){
            console.log(err);
        }

    }

    useEffect(()=>{
        getAllReviews()
    },[]);
  return (
    <div className='text-white'>
        <div className='h-[180px] max-w-maxContent '>
            <Swiper slidesPerView={4} spaceBetween={24} loop={true} freeMode={true} autoplay={{delay:2500}} modules={[FreeMode,Pagination,Autoplay]}>
                {
                    reviews.map((review,index)=>{
                        return(
                            
                                <SwiperSlide key={index} className='bg-richblack-800 p-[18px] rounded-md' >
                                    <div className='flex items-center gap-x-[10px] mb-[10px]'>
                                    <img src={review?.user?.image} className='w-[50px] h-[50px] rounded-full'/>
                                       <div>
                                       <p className='text-richblack-5'>{review?.user?.firstName} {review?.user?.lastName}</p>
                                        <p className='text-richblack-200'>{review?.course?.courseName}</p>
                                       </div>
                                    </div>
                                <p className='text-richblack-5 h-[50px] text-[16px]'>
                                    {review?.review.length>15?`${review?.review?.substring(0,15)}....`:review?.review}
                                </p>
                                <div className='flex gap-x-[10px] items-center mt-[10px]'>
                                <p className='text-yellow-50'>
                                    {review?.rating}
                                </p>
                                <RatingStars ReviewCount={review?.rating}/>
                                </div>


                            </SwiperSlide>
                          

                        )
                    })
                }
            </Swiper>
        </div>



    </div>
  )
}
