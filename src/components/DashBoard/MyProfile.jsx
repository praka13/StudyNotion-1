import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { IconBtn } from '../common/IconBtn';
import { SideBar } from './SideBar';
import { FaRegEdit } from "react-icons/fa";

export const MyProfile = () => {

    const {user}=useSelector((state)=>state.profile);
    console.log(user?.additionalDetails?.about);
    const navigate=useNavigate();
  return (
    <div className="text-white mb-[100px]">
       
      <div className="w-[1217px] h-[120px] flex items-center justify-start">
      <h1 className="font-medium font-inter text-[30px] text-richblack-5 ml-[20px] mt-0">My Profile</h1>
      </div>
       
            {/* Section1 */}
        <div className="w-[792px] h-[126px] bg-richblack-800 flex items-center justify-between gap-[20px] p-[24px] ml-[155px] rounded-lg">
            <div className="flex items-center justify-center gap-[10px]">
                <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover'></img>
                <div>
                    <p>{user?.firstName+" "+user?.lastName}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
            <button className="flex justify-center items-center w-[96px] h-[40px] gap-[8px] text-black font-medium font-inter text-[16px] bg-yellow-50 rounded-lg" onClick={()=>navigate("/dashboard/settings")}>
                <FaRegEdit/>
                Edit
            </button>
        </div>
        

        {/* Section 2 */}

        <div className="w-[792px] h-[126px] flex flex-col items-center justify-between bg-richblack-800 ml-[155px] rounded-lg mt-[30px]">
            <div className="w-[750px] flex items-center justify-between mt-3 font-semibold font-inter">
                <p>About</p>
                <button className="flex justify-center items-center w-[96px] h-[40px] gap-[8px] text-black font-medium font-inter text-[16px] bg-yellow-50 rounded-lg" onClick={()=>navigate("/dashboard/settings")}>
                <FaRegEdit/>
                Edit
            </button>
            </div>
            <p className="flex items-start w-[750px] mb-4">{user?.additionalDetails?.about ?? "Write Something about Yourself"}</p>
        </div>

        {/* Section 3 */}

        <div className="w-[792px] h-[400px] bg-richblack-800 mt-[30px] flex flex-col items-center justify-center ml-[155px] rounded-lg">
            <div className="w-[744px] h-[40px] flex items-center justify-between">
                <p className="font-semibold font-inter text-[18px]">Personal Details</p>
                <button className="flex justify-center items-center w-[96px] h-[40px] gap-[8px] text-black font-medium font-inter text-[16px] bg-yellow-50 rounded-lg" onClick={()=>navigate("/dashboard/settings")}>
                <FaRegEdit/>
                Edit
            </button>

            </div>
            <div>
                <div className="w-[744px] h-[46px] flex items-center justify-between mt-[15px]" >
                <div>
                    <p className="text-richblack-600 font-inter text-sm">First Name</p>
                    <p className="text-richblack-5 font-inter">{user?.firstName}</p>
                </div>
                <div className="mr-[230px]">
                    <p className="text-richblack-600 font-inter text-sm">Last Name</p>
                    <p className="text-richblack-5 font-inter">{user?.lastName}</p>
                </div>
                </div>
                <div className="w-[744px] h-[46px] flex items-center justify-between mt-[15px]">
                <div>
                    <p className="text-richblack-600 font-inter text-sm">Email</p>
                    <p className="text-richblack-5 font-inter">{user?.email}</p>
                </div>
                <div className="mr-[202px]">
                    <p className="text-richblack-600 font-inter text-sm">Phone Number</p>
                    <p className="text-richblack-5 font-inter">{user?.additionalDetails?.contactNumber??"Add Phone Number"}</p>
                </div>
                </div>
                <div className="w-[744px] h-[46px] flex items-center justify-between mt-[15px]">
                <div>
                    <p className="text-richblack-600 font-inter text-sm">Gender</p>
                    <p className="text-richblack-5 font-inter">{user?.additionalDetails?.gender??"Add Gender"}</p>
                </div>
                <div  className="mr-[220px]">
                    <p className="text-richblack-600 font-inter text-sm">Date of Birth</p>
                    <p>{user?.additionalDetails?.dateOfBirth??"Add date of Birth"}</p>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
