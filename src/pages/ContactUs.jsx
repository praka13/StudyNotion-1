import React from 'react';
import { TiMessages } from "react-icons/ti";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { ContactFormSection } from '../components/common/ContactFormSection';
import { ContactUsForm } from '../components/common/ContactUsForm';
import { Footer } from '../components/common/HomePage/Footer';

export const ContactUs = () => {
  return (
    <div>
        <div className="w-[1440px] h-[979px] gap-x-[52px] flex items-start justify-center mt-[80px]">
            <div className="w-[450px] h-[390px] gap-y-[24px] p-[24px] bg-[#161d29] rounded-lg">
                <div className="w-[402px] h-[98px] p-[12px] gap-x-[10px] flex">
                    <TiMessages className="text-[32px] text-richblack-300"/>
                    <div className="gap-y-[2px]">
                        <h1 className="font-semibold font-inter text-[18px] text-[#f1f2ff]">Chat On Us</h1>
                        <p className="text-sm font-inter text-[14px] text-[#999daa]">Our friendly team is here to help.</p>
                        <p className="text-sm font-inter text-[14px] text-[#999daa]">@mail address</p>
                    </div>


                </div>

                <div className="w-[402px] h-[98px] p-[12px] gap-x-[10px] flex">
                    <FaGlobeAmericas className="text-[32px] text-richblack-300"/>
                    <div className="gap-y-[2px]">
                        <h1 className="font-semibold font-inter text-[18px] text-[#f1f2ff]">Visit Us</h1>
                        <p className="text-sm font-inter text-[14px] text-[#999daa]">Come and say hello at our office HQ.</p>
                        <p className="text-sm font-inter text-[14px] text-[#999daa]">Here is the location/ address</p>
                    </div>


                </div>

                <div className="w-[402px] h-[98px] p-[12px] gap-x-[10px] flex">
                    <FaPhone className="text-[32px] text-richblack-300"/>
                    <div className="gap-y-[2px]">
                        <h1 className="font-semibold font-inter text-[18px] text-[#f1f2ff]">Call Us</h1>
                        <p className="text-sm font-inter text-[14px] text-[#999daa]">Mon - Fri From 8am to 5pm</p>
                        <p className="text-sm font-inter text-[14px] text-[#999daa]">+123 456 7890</p>
                    </div>


                </div>
                
            </div>
            <div className="w-[698px] h-[799px] border border-[#424854] gap-y-[32px] p-[52px] rounded-lg flex flex-col items-start">
                <h1 className="w-[594px] h-[88px] font-semibold font-inter text-[36px] text-[#f1f2ff]">Got a Idea? We’ve got the skills. Let’s team up</h1>
                <p className="font-medium text-[16px] text-[#838894]">Tell us more about yourself and what you’re got in mind.</p>
               
                <ContactUsForm/>
      

            </div>



        </div>

        <div className="w-[1440px] h-[460px] flex flex-col items-center justify-center">
            <p className="text-[36px] text-[#f1fdff] font-semibold">Reviews from other learners</p>

        </div>
        <Footer/>

    </div>
  )
}
