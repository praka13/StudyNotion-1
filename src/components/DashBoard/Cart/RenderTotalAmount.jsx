import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../../../services/operations/studentPaymentAPI';
import { useNavigate } from 'react-router-dom';

export const RenderTotalAmount = () => {

    const {total,cart}=useSelector((state)=>state.cart);
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleBuyCourse=()=>{

        const courses=cart.map((course)=>course._id);
        buyCourse(token,courses,user,navigate,dispatch);
        console.log(courses);
       

    }
  return (
    <div className='w-[282px] h-[170px] bg-richblack-800 p-[24px] mt-[20px] flex flex-col justify-between rounded-lg'>
        <p className='text-sm font-semibold font-inter text-[14px] text-richblack-200'>Total:</p>
        <p className='font-semibold font-inter text-[24px] text-yellow-50'>Rs. {total}</p>
                
        <button onClick={handleBuyCourse} className='h-[48px] rounded-lg text-[16px] font-medium font-inter text-richblack-900  bg-yellow-50'>
            Buy Now
        </button>
    </div>
  )
}
