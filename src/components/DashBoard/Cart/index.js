import React from 'react'
import { useSelector } from 'react-redux';
import { RenderCartCourses } from './RenderCartCourses';
import { RenderTotalAmount } from './RenderTotalAmount';

export const Cart = () => {

    const {total,totalItems}=useSelector((state)=>state.cart)
  return (
    <div className={`${totalItems>=2?("h-fit"):("h-screen")} mb-[50px]`}>
      <div className='w-[1217px] h-[120px] py-[24px] px-[30px]'>
      <div className='text-sm font-inter text-[14px] text-richblack-300'>Home / Dashboard /  <span className='text-yellow-50'>WishList</span></div>
        <div className='mt-[10px] font-medium text-[30px] text-richblack-5'>My Wishlist</div>
      </div>
      <div className='w-[1073px] h-[37px] px-[30px]'>
      <p className=' font-semibold font-inter text-[16px] text-richblack-400'>{totalItems} courses in Wishlist</p>
      <div className='w-[1040px] h-[1px] bg-richblack-400 mt-[5px]'></div>
      </div>

        {total>0?
        (
            <div className='w-[1073px] flex'>
                <RenderCartCourses/>
        <RenderTotalAmount/>
            </div>
        ):(<p className='text-[30px] text-richblack-5 flex items-center justify-center mr-[200px]'>Your Cart is empty</p>)}
    </div>
  )
}
