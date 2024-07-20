import React from 'react'
import { Link } from 'react-router-dom'

export const AfterReset = () => {
  return (

      <div className=" w-[508px] h-screen flex flex-col justify-center items-center p-[32px] gap-[24px]  ml-[520px]">
        <p className="font-inter w-[444px] h-[38px] font-semibold text-[30px] text-richblack-5 flex justify-start">Reset complete!</p>
        <p className="text-lg w-[444px] h-[52px] font-inter flex justify-start text-richblack-400">All done! We have sent an email to m***********@gmail.com to confirm</p>

        <Link to="/login">
        <button className="w-[444px] h-[48px] p-[12px] gap-[8px] flex  bg-yellow-100 items-center justify-center rounded-lg">
           
                Return to Login
          
        </button>
        </Link>
        <Link to="/login">
        <div className="w-[444px] h-[48px] p-[12px] gap-[8px] flex justify-start text-richblack-400">
           

           Back to login
          
        </div>
        </Link>
    
  </div>  
  
   
  )
}
