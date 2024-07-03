import React ,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { FaLongArrowAltLeft } from "react-icons/fa";

export const ForgotPassword = () => {

   

 
    const dispatch=useDispatch();
    const {loading}=useSelector((state)=>state.auth);
    const [emailSent,setEmailSent]=useState(false);
    const [email,setEmail]=useState("")

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }
  return (
    <div className="text-richblack-500 flex justify-center items-center">
        {
            loading?(
                <div>Loading..</div>
            ):(
                <div className="flex flex-col items-center justify-center h-[448px] w-[508px]">
                    <div className="gap-[12px]">
                    <h1 className="h-[38px] w-[444px] items-center justify-start flex font-semibold font-weight-600 font-inter text-[30px] text-richblack-5">
                        {
                            !emailSent ? "Reset Your Password":"Check Your Email"
                        }
                    </h1>

                    <p className="h-[78px] w-[444px] items-center justify-start flex font-weight-400 text-[18px] font-inter text-richblack-500">
                        {
                            !emailSent?"Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`
                        }
                    </p>
                    </div>

                    <form onSubmit={handleOnSubmit} className="mt-[20px] h-[22px] w-[444px] items-center justify-start flex flex-col">
                        {
                            !emailSent && (
                                <label>
                                    <p className="text-[14px] font-weight-400 font-inter">Email Address<sup className='text-pink-200'>*</sup></p>
                                    <input className="w-[444px] h-[48px] p-[12px] gap-[12px] text-black  bg-richblack-500 rounded-xl" required type="email" name="email" value ={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email Address">



                                    </input>
                                </label>
                            )
                        }

                        <button type='submit' className="gap-[8px] p-[12px] h-[48px] w-[444px] flex items-center justify-center rounded-xl bg-yellow-200 mb-5 text-black mt-6">
                            {
                                !emailSent ? "Reset Password":"Resend Email"
                            }
                            
                        </button>
                    </form>

                    <div className="mt-32 items-center justify-start flex flex-row gap-[8px] p-[12px] text-white">

                        <Link to="/login" className="flex gap-2">
                        <FaLongArrowAltLeft className="mt-1"/>
                         
                            <p>Back To Login</p>
                        </Link>
                    </div>

                </div>
            )
        }

    </div>
  )
}
