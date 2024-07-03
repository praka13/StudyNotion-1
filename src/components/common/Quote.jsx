import React from 'react'
import HighLightText from './HomePage/HighLightText'

export const Quote = () => {
  return (
    
    <div className="text-[36px] font-inter text-center"><HighLightText text={'"'} textColor={"text-richblack-500"}/>We are passionate about revolutionizing the way we learn. Our innovative platform <HighLightText text={"combines technology"} textColor={"text-[#1FA2FF]"}></HighLightText>,<HighLightText text={"expertise"} textColor={"text-[#FF512F]"}></HighLightText>,and community to create an <HighLightText text={"unparalleled educational experience."} textColor={"text-[#E65C00]"}></HighLightText><HighLightText text={'"'} textColor={"text-richblack-500"}/></div>
    
  )
}
