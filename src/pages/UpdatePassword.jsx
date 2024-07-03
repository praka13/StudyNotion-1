import React,{ useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';


export const UpdatePassword = () => {

    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:""
})
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation()
    const {loading}=useSelector((state)=>state.auth);
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const handleOnChange=(e)=>{
        setFormData((prevData)=>(
           {
            ...prevData,
            [e.target.name]:e.target.value

           }

        ))
    }

    const {password,confirmPassword}=formData;

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,confirmPassword,token,navigate))
    }
  return (
    <div className="w-full h-full flex items-center justify-center">
        {
            loading?(
            <div>
                Loading...
            </div>):(
                <div className="w-[508px] h-[586px] flex flex-col items-center justify-center gap-4">
                   <h1 className="flex items-center justify-start w-[444px] h-[38px] font-semibold font-inter font-weight-600 text-[30px] text-richblack-5">Choose new Password</h1>
                   <p className="flex items-center justify-start w-[444px] h-[52px] font-weight-400 text-[18px] font-inter text-richblack-300">Almost done,Enter your new password and you're all set</p>

                    <form onSubmit={handleOnSubmit}className="flex items-center justify-start flex-col w-[444px] h-[172px] gap-4">
                    <label>
                        <p className="w-[444px] h-[22px] font-inter text-[14px] text-richblack-300">New Password<sup className="text-pink-300">*</sup></p>
                           
                            <input required type={showPassword?"text":"password"}
                        value={password} name="password" onChange={handleOnChange} className=" w-[444px] h-[48px] p-[12px] gap-[12px] rounded-xl bg-richblack-400" placeholder="Enter New Password"></input>
                        <span className="text-richblack-500 flex" onClick={()=>setShowPassword((prev)=>!prev)}>
                            {
                                !showPassword?<AiFillEyeInvisible/>:<AiFillEye fontSize={24}/>
                            }
                        </span>
                          
                    </label>

                    <label>
                        <p className="w-[444px] h-[22px] font-inter text-[14px] text-richblack-300 mb-0">Confirm Password<sup className="text-pink-300">*</sup></p>
                        <input required className=" w-[444px] h-[48px] p-[12px]  rounded-xl bg-richblack-400" type={showConfirmPassword?"text":"password"}
                        value={confirmPassword} name="confirmPassword" onChange={handleOnChange} placeholder='Confirm Password'></input>
                        <span className="text-richblack-500 flex" onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                            {
                                !showConfirmPassword?<AiFillEyeInvisible fontSize={24}/>:<AiFillEye fontSize={24}/>
                            }
                        </span>
                    </label>

                    <button type="submit" className="w-[444px] h-[48px] p-[12px] bg-yellow-100 rounded-xl">

                        Reset Password

                    </button>

                                 
                   <div className="flex text-richblack-200">
                        <Link to="/login">
                            <p>Back To Login</p>
                        </Link>
                    </div>
                  
                   </form>

                </div>
            )
        }

    </div>
  )
}
