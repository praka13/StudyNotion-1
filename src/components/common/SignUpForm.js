import React from 'react';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignUpData } from '../../slices/authSlice';
import { sendOTP } from '../../services/operations/authAPI';

const SignupForm = () => {

    const[formData,setFormData]=useState({firstName:"",lastName:"",email:"",password:"",confirmPassword:""})
   // const navigate=useNavigate();
   const dispatch=useDispatch();
   const navigate=useNavigate();
    const[showPassword,setShowPassword]=useState(false);
    const[showPassword2,setShowPassword2]=useState(false);
    const[accountType,setAccountType]=useState("Student");
    function changeHandler(event){
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value

            }
        ))

    }

    function submitHandler(event){
        event.preventDefault();
            if(formData.password!==formData.confirmPassword){
                   toast.error("Passwords do not match");
                   return;
            }
           // setIsLoggedIn(true);
            //toast.success("Account Created");

            const finalData={
                ...formData,
                accountType
            }
            
            console.log(finalData);
            dispatch(setSignUpData(finalData));
            dispatch(sendOTP(finalData.email,navigate))
           // navigate("/dashboard");
    }
  return (
    <div>
        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max '>
            <button onClick={()=>setAccountType("Student")}
                className={`${accountType==="Student"?"bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full transition-all duration-200":"bg-transparent text-richblack-200 py-2 px-5 rounded-full transition-all duration-200"}`}
            >
                Student
            </button>
            <button onClick={()=>setAccountType("Instructor")}
                className={`${accountType==="Instructor"?"bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full transition-all duration-200":"bg-transparent text-richblack-200 py-2 px-5 rounded-full transition-all duration-200"}`}
            >
                Instructor
            </button>
        </div>

        <form onSubmit={submitHandler}>

            <div className='flex flex-row gap-x-4'>
            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] '>
                    First Name<sup className='text-pink-200'>*</sup>
                </p>
                <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type="text" name="firstName" onChange={changeHandler} placeholder='Enter First Name' value={formData.firstname}></input>
            </label>

            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Last Name<sup className='text-pink-200'>*</sup>
                    </p>
                <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type="text" name="lastName" onChange={changeHandler} placeholder='Enter Last Name' value={formData.lastname}></input>
            </label>


            </div>

            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email<sup className='text-pink-200'>*</sup>
                    </p>
                <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type="email" name="email" onChange={changeHandler} placeholder='Enter Email Addrress' value={formData.email}></input>
            </label>

                <div className='flex flex-row gap-x-4'>

                        <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Create Password<sup className='text-pink-200'>*</sup>
                    </p>
                <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type={showPassword?("text"):("password")} name="password" onChange={changeHandler} placeholder='Enter Password' value={formData.password}></input>
                <span className='absolute right-3 top-[38px] cursor-pointer' onClick={()=>setShowPassword(!showPassword)}> 
            {showPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
        </span>
                    </label>

                    <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Confirm Password<sup sup className='text-pink-200'>*</sup>
                    </p>
                <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type={showPassword2?("text"):("password")} name="confirmPassword" onChange={changeHandler} placeholder='Enter Password' value={formData.confirmPassword}></input>
                <span className='absolute right-3 top-[38px] cursor-pointer' onClick={()=>setShowPassword2((prev)=>!prev)}> 
            {showPassword2?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
        </span>
                    </label>
                </div>

                <button type='submit'  className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                    Create Account
                </button>
        </form>
    </div>
  )
}

export default SignupForm;