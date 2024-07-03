import React from 'react'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../services/apiconnector';
import { endpoints, settingsEndpoints } from '../../services/apis';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../slices/authSlice';
import { setUser } from '../../slices/profileSlice';
import { resetCart } from '../../slices/cartSlice';
import { RiDeleteBin5Line } from "react-icons/ri";

export const DeleteProfile = () => {
    const{token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const deleteHandler=async()=>{
        try{
            const response=await apiConnector("DELETE",settingsEndpoints.DELETE_PROFILE_API,{token});
            console.log("response",response);
            dispatch(setToken(null));
            dispatch(resetCart());
            dispatch(setUser(null));
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            toast.success("Account Deleted")
            navigate("/")

        }
        catch(err){
            console.log(err);
            toast.error("Account not deleted");


        }

    }
  return (
    <div  className="w-[792px] h-[182px] p-[24px] gap-[19px]  bg-pink-900 flex items-start justify-center ml-[180px] mt-[30px] rounded-lg mb-[100px]">
        <div className="w-[52px] h-[52px] p-[14px] bg-pink-700 flex items-center justify-center rounded-full">
            <RiDeleteBin5Line className="w-[24px] h-[24px] text-pink-200"/>


        </div>
        <div className="w-[673px] h-[134px] flex flex-col gap-y-[10px]">
            <p className="font-bold font-inter text-[18px] text-pink-5">Delete Account</p>
            <p className="font-medium font-inter text-[14px] text-pink-25">Would you like to delete account?</p>
            <p className="w-[553px] font-medium font-inter text-[14px] text-pink-25">This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
            <p onClick={deleteHandler} className="font-medium italic font-inter text-pink-300 cursor-pointer">I want to delete my account.</p>


        </div>

    </div>
  )
}
