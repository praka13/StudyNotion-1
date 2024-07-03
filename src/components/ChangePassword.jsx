import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { apiConnector } from '../services/apiconnector';
import { settingsEndpoints } from '../services/apis';
import toast from 'react-hot-toast';
import { setUser } from '../slices/profileSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


export const ChangePassword = () => {
    const {token}=useSelector((state)=>state.auth);
    const[showPassword,setShowPassword]=useState(false);
    const dispatch=useDispatch();
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                newPassword:"",
                confirmNewPassword:"",
                
             
            })
        }

    },[isSubmitSuccessful,reset]);

    const changePassword=async(data)=>{
        const {currentPassword,changePassword}=data;
        try{
            const response=await apiConnector("POST",settingsEndpoints.CHANGE_PASSWORD_API,{currentPassword,changePassword,token});
            console.log("response",response);
            toast.success("Password Updated Successfully");
            dispatch(setUser(response.data.user));


        }
        catch(err){
            console.log(err);
            toast.error("Could not Update Password")

        }

    }
  return (
    <div className="w-[792px] h-[170px] flex flex-col p-[24px] gap-[20px] bg-richblack-800 mt-[30px] ml-[180px] rounded-md">

        <form onSubmit={handleSubmit(changePassword)} className="flex flex-col">
        <div className="flex gap-[20px]">
        <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Current Password<sup className='text-pink-200'>*</sup>
                    </p>
                <input className='bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' type={showPassword?("text"):("password")}  id="currentPassword" name="currentPassword" {...register("currentPassword")}placeholder='Enter Password'></input>
                <span className='absolute right-3 top-[38px] cursor-pointer' onClick={()=>setShowPassword(!showPassword)}> 
            {showPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
        </span>
                    </label>
                    <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Change Password<sup className='text-pink-200'>*</sup>
                    </p>
                <input className='bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' type={showPassword?("text"):("password")}  id="changePassword" name="changePassword" {...register("changePassword")}placeholder='Enter Password'></input>
                <span className='absolute right-3 top-[38px] cursor-pointer' onClick={()=>setShowPassword(!showPassword)}> 
            {showPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
        </span>
                    </label>
        </div>
        <button type="submit" className="w-[86px] h-[46px] flex justify-center items-center bg-yellow-50 rounded-lg mt-[15px]">
                Submit
            </button>
        </form>

    </div>
  )
}
