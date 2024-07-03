import React,{useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { endpoints } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
import toast from 'react-hot-toast';
import { countryCode } from '../../data/countrycode';


export const ContactUsForm = () => {

    const {loading,setLoading}=useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    const submitContactForm=async(data)=>{
        console.log("Data",data);
        try{
           //setLoading(true);
            const response =await apiConnector("POST",endpoints.CONTACT_US_API,data);

            console.log("response",response);
          // setLoading(false);
            toast.success("Contact Saved Succeessfully")
        }
        catch(err){

            console.log("Error",err.message);
           //setLoading(false);

        }

    }


    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }

    },[isSubmitSuccessful,reset]);



  return (
    <form className onSubmit={handleSubmit(submitContactForm)}>
        <div className="flex flex-col ">

        <div className="flex flex-col gap-y-5 w-[536px] h-[268px]">
            {/* firstName */}
            <div className="flex gap-x-5">
            <div className="flex flex-col">
                <label htmlfor="firstName" className="text-sm font-inter text-[14px] text-[#F1F2FF]">First Name</label>
                <input 
                type="text"
                name="firstName"
                id="firstName"
                className="text-white w-[258px] h-[48px] p-[12px] gap-[12px] bg-[#161D29] rounded-md"
                placeholder="Enter First Name"
                {...register("firstName",{required:true})}
                />
                {
                    errors.firstName && (
                        <span>
                           Please Enter Your First Name 
                        </span>
                    )
                }
            </div>
            {/* lastName */}

            <div className="flex flex-col">
                <label htmlfor="lastName" className="text-sm font-inter text-[14px] text-[#F1F2FF]">Last Name</label>
                <input 
                type="text"
                name="lastName"
                id="lastName"
                className="text-white w-[258px] h-[48px] p-[12px] gap-[12px] bg-[#161D29] rounded-md"
                placeholder="Enter Last Name"
                {...register("lastName")}
                />
               
            </div>
            </div>
           

            {/* email */}

            <div className="flex flex-col">
                <label htmlfor="email" className="text-sm font-inter text-[14px] text-[#F1F2FF]">Email Address</label>
                <input 
                type="email"
                name="email"
                id="email"
                className="text-white w-[536px] h-[48px] p-[12px] gap-[12px] bg-[#161D29] rounded-md"
                placeholder="Enter Email Address"
                {...register("email",{required:true})}/>
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>
            {/* phoneNo */}

            <div className="flex flex-col gap-x-10">
                <label htmlfor="phoneNumber"className="text-sm font-inter text-[14px] text-[#F1F2FF]">Phone Number</label>

                <div className="flex flex-row gap-5">
                        {/* dropdown */}
                    <div className="flex ">
                        <select
                        className="text-white w-[81px] h-[48px] p-[12px] gap-[12px] bg-[#161D29] rounded-md" 
                        
                        
                        name="dropdown"
                        id="dropdown"
                        {...register("countryCode",{required:true})}
                        >
                            {
                                countryCode.map((code,index)=>{
                                  return ( <option key={index} value={code.code}>
                                      {code.code}-{code.country}
                                    </option>)
                                })
                            }
                        </select>

                    </div>
                     {/* phoneNo */}

                     <div>
                        <input type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="enter phone number"
                        className="text-white w-[435px] h-[48px] p-[12px] gap-[12px] bg-[#161D29] rounded-md"
                        {...register("phoneNo",{required:{value:true,message:"Please enter phone Number"},maxLength:{value:10,message:"Invalid Phone No."},minLength:{value:8,message:"Invalid Phone Number"}})}></input>
                     </div>

                </div>
                {
                    errors.phoneNo&&(
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>
            </div>
            {/* message */}
            <div className="flex flex-col w-[536px] h-[151px]">
                <label htmlfor="message" className="text-sm font-inter text-[14px] text-[#f1f2ff]">Message</label>
                <textarea
                name="message"
                id="message"
                cols="30"
                rows="7"
                className="text-white w-[536px] h-[123px] p-[12px] gap-[12px] rounded-md bg-[#161d29]"
                placeholder="Enter Your Message Here"
                {...register("message",{required:true})}>

                </textarea>
                {
                    errors.message && (
                        <span>
                            Please enter your message
                        </span>
                    )
                }

            </div>

            <button type="submit" className="rounded-md bg-yellow-50 text-center px-6 text-[16px] font-semibold mt-5 text-black w-[536px] h-[48px]">
                Send Message

            </button>
        </div>
        

    </form>
  )
}
