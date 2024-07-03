import React from 'react';
import { ContactUsForm } from './ContactUsForm';

export const ContactFormSection = () => {
  return (
    <div className="mx-auto w-[1440px] h-[805px] gap-[32px] flex flex-col items-center justify-center">
      <div className="w-[600px] h-[80px] flex flex-col items-center justify-center text-center">
      <h1 className="font-semibold font-inter text-[36px] text-richblack-5">Get in Touch</h1>
      <p className="font-medium font-inter text-[16px] text-richblack-400">We’d love to here for you, Please fill out this form.</p>
      </div>
      <div className="w-[600px] h-[603px] p-[32px] gap-[36px] flex flex-col items-center justify-center">
        <ContactUsForm/>
      </div>
      

        
    </div>
  )
}
