import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {FreeMode,Pagination,Autoplay,Navigation} from "swiper/modules";
import { Course_Card } from '../Course_Card';

export const CourseSlider = ({courses}) => {

  console.log(courses);
  return (
    <div className='mt-[40px]'>
      {
        courses?.length!==0 ?(
        <div>
         <Swiper loop={true} slidesPerView={3} spaceBetween={24} modules={[Pagination,Navigation,Autoplay]}  autoplay={{delay:2500, disableOnInteraction:false}}>
          {
            courses?.map((course,index)=>{
              console.log(course);
              return(
                <SwiperSlide key={index}>

                  <Course_Card course={course}/>

                
                

                </SwiperSlide>
              )
            })
          }
          

         </Swiper>

        </div>):(<div>No course Found</div>)

      }
        
    </div>
  )
}
