import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../services/apiconnector';
import { settingsEndpoints } from '../../services/apis';
import { updateProfile } from '../../services/operations/settingsAPI';
import { setUser } from '../../slices/profileSlice';
import toast from 'react-hot-toast';

export const UpdateProfile = () => {
    const {token}=useSelector((state)=>state.auth);
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
                gender:"",
                dateOfBirth:"",
                contactNumber:"",
                about:"",
             
            })
        }

    },[isSubmitSuccessful,reset]);

    const handleUpdate=async(data)=>{
        const{gender,dateOfBirth,contactNumber,about}=data

        
            try {
                const response = await apiConnector("PUT", settingsEndpoints.UPDATE_PROFILE_API, {gender,dateOfBirth,about,contactNumber},{Authorisation: `Bearer ${token}`})
                console.log("UPDATE_PROFILE_API API RESPONSE............", response)
          
                if (!response.data.success) {
                  throw new Error(response.data.message)
                }
            
              
                dispatch(
                  setUser(response.data.userDetails)
                )
                
                
                localStorage.setItem("user",JSON.stringify(response.data.userDetails));
                toast.success("Profile Updated Successfully")
              } catch (error) {
                console.log("UPDATE_PROFILE_API API ERROR............", error)
                toast.error("Could Not Update Profile")
              }
        
           
    }
  return (
    <div className="w-[792px] h-[388px] p-[24px] gap-[20px] flex flex-col justify-center  bg-richblack-800 ml-[180px] rounded-md">
        <h1 className="font-semibold font-inter text-[18px] text-richblack-5 flex justify-start">Profile Information</h1>
        <form className="flex flex-col" onSubmit={handleSubmit(handleUpdate)}>
            <div className="w-[744px] h-[76px] gap-[24px] flex items-center  justify-between ">
            <div className="flex flex-col"> 
            <label htmlFor="gender" className="text-sm font-inter text-[14px] text-richblack-5">Gender</label>
            <select className="w-[360px] h-[48px] p-[13px] rounded-md bg-richblack-700 text-richblack-200" name="gender" id="gender" {...register("gender")}>
                <option value="Male">
                    Male
                </option>
                <option value="Female">
                    Female

                </option>
                <option value="Others">
                    Others
                </option>
            </select>
            </div>
            <div className="flex flex-col">
            <label htmlFor="contactNumber" className="text-sm font-inter text-[14px] text-richblack-5">Contacts</label>
            <input  className="w-[360px] h-[48px] p-[13px] rounded-md bg-richblack-700 text-richblack-200" type="number" name="contactNumber" id="contactNumber" {...register("contactNumber")}></input>
            </div>
            </div>
            <div className="w-[744px] h-[76px] gap-[24px] flex items-center  justify-between mt-[20px]">
            <div className="flex flex-col">
            <label htmlFor="dateOfBirth" className="text-sm font-inter text-[14px] text-richblack-5">Date of Birth</label>
            <input className="w-[360px] h-[48px] p-[13px] rounded-md bg-richblack-700 text-richblack-200" type="date" name="dateOfBirth" id="dateOfBirth" {...register("dateOfBirth")}></input>
            </div>
           <div className="flex flex-col">
           <label htmlFor="about" className="text-sm font-inter text-[14px] text-richblack-5">About</label>
            <input className="w-[360px] h-[48px] rounded-md bg-richblack-700 text-richblack-200 p-[13px]" type="text" name="about" id="about" {...register("about")}></input>
           </div>
            </div>
            <button type="submit" className="w-[86px] h-[46px] flex justify-center items-center bg-yellow-50 rounded-lg mt-[20px]">
                Submit
            </button>
        </form>

    </div>
  )
}
