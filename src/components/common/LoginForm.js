import React from 'react';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../../services/operations/authAPI';

const LoginForm = () => {

    const [formData,setFormData]=useState({email:"",password:""})
    const[showPassword,setShowPassword]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    function changeHandler(event){
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value

            }
        ))

    }

    const {email,password}=formData;

    const submitHandler=(event)=>{
        event.preventDefault();

        dispatch(login(email,password,navigate));



    }
  return (
    <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type="email" name="email" value={formData.email} onChange={changeHandler} placeholder='Enter Email Id'></input>
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type={showPassword?("text"):("password")} name="password" value={formData.password} onChange={changeHandler} placeholder='Enter Password'></input>
        
        <span className='absolute right-3 top-[38px] cursor-pointer'onClick={()=>setShowPassword((prev)=>!prev)}> 
            {showPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
        </span>

        <Link to="/forgot-password">
            <p className='max-w-max text-xs mt-1 text-blue-100 ml-auto'>
                Forgot Password
            </p>
        </Link>
        </label>

   
        <button type='submit' className='bg-yellow-50  rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Sign In
        </button>
        
    </form>
  )
}

export default LoginForm;