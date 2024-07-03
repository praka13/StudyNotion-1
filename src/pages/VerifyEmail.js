import React,{useState,useEffect }from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { sendOTP } from '../services/operations/authAPI';
import {signUp} from "../services/operations/authAPI";
import { Link } from 'react-router-dom';



export const VerifyEmail = () => {

    const [otp,setotp]=useState('');
    const {loading,signUpData}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch()

    useEffect(()=>{
        if(!signUpData){
            navigate("/signUp")
        }
    },[])


    const handleOnSubmit=(e)=>{

        e.preventDefault();

        const{
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword}=signUpData



        
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))

    }
  return (
    <div>
        {
            loading?(<div>
               Loading...
            </div>):(
                <div className="w-[508px] h-[370px] flex flex-col items-center justify-center mt-[80px] ml-[466px] p-[32px] gap-[24px]">
                    <h1 className="text-richblack-5 flex justify-start w-[444px] h-[38px] font-inter text-[30px] font-semibold">Verify Email</h1>
                    <p className="w-[444px] h-[52px] text-lg font-inter text-[18px] text-richblack-400">A Verification code has been sent to you.Enter the code below</p>

                    <form onSubmit={handleOnSubmit}>
                      <div className="w-[444px] h-[48px] gap-20 flex justify-start">
                      <OTPInput  value={otp} onChange={setotp} numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props)=>(<input {...props} className="h-[30px] w-[30px] gap-6 bg-richblack-300 rounded-sm"></input>)}>-</OTPInput>
                      </div>
                        <button type='submit' className="w-[444px] h-[48px] p-[12px] gap-[8px] bg-yellow-100 justify-start rounded-lg">
                            Verify Email
                        </button>
                    </form>

                    <div className="flex justify-between w-[444px] h-[48px] gap-[12px]">
                    <div className="text-md font-inter text-[16px] text-richblack-400">                       
                        <Link to="/login">
                            <p>Back To Login</p>
                        </Link>
                    </div>
                    <button onClick={()=>dispatch(sendOTP(signUpData.email,navigate))} className="mt-[-11px] text-md font-inter text-[16px] text-[#47A5C5]">Resend it</button>
                       
              
                    </div>
                </div>
            )
        }

    </div>
  )
}
