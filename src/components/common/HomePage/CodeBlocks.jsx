import React from 'react';
import Button from "./Button";
import HighLightText from "./HighLightText";
import {FaArrowRight} from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks=({
    position,heading,subHeading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor
})=>{
    return(
        <div className={`flex ${position} my-20 justify-between gap-10`}>

            {/* Section 1 */}
            <div className='w-[50%] flex flex-col gap-8 '>

                <div className='text-4xl font-bold'>
                {heading}
                </div>
                <div className='text-richblack-300 font-bold'> 
                    {subHeading}
                </div>
                <div className='flex gap-7 mt-7'>

                    <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>

                        <div className='flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight/>

                        </div>

                    </Button>



                    <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>

                            {ctabtn2.btnText}
                           

                       

                    </Button>

       

                </div>

            </div>
       
            {/* Section 2 */}

            

            <div className='relative flex flex-row h-[400px] text-[10px]  py-6 w-[400px] bg-richblack-800 pr-12'>
            <div className="absolute h-[257.05px] w-[250.95px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(138,43,226,0.5)] via-[#FFA500] to-[#F8F8FF] opacity-[15%] rounded-t-full rounded-b-full my-[-100px] mx-[-100px]"></div>


                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-none ${codeColor} pr-2`}>

                    <TypeAnimation sequence={[codeblock,1000,""]} omitDeletionAnimation={true} repeat={Infinity} style={{whiteSpace:"pre-line",display:"block"}} />

                    

                </div>

            </div>


        </div>
    )
}


export default CodeBlocks; 