import React from 'react'
import HighLightText from '../components/common/HomePage/HighLightText';
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import { Quote } from '../components/common/Quote';
import FoundingStory from "../assets/Images/FoundingStory.png";
import { StatsComponent } from '../components/common/StatsComponent';
import { LearningGrid } from '../components/common/LearningGrid';
import { ContactFormSection } from '../components/common/ContactFormSection';
import {Footer} from "../components/common/HomePage/Footer"
import { ReviewSlider } from '../components/common/ReviewSlider';

export const AboutUs = () => {
  return (
    <div>
    <div className="  text-white">
        {/* section1 */}
        <div className="bg-richblack-700 w-[1440px] h-[618px] flex flex-col justify-center items-center">
        <section className="w-10/12 flex flex-col justify-center items-center gap-[52px]">
            <div className="text-center">
                <header className="flex-col flex items-center justify-center">
                <p className="font-semibold font-inter text-[36px] w-[809px]">Driving Innovation in Online Education for a <HighLightText text={"Brighter Future"} textColor={"text-[#1FA2FF]"}></HighLightText></p>
                <p className="w-[809px] text-lg text-[16px] font-inter text-richblack-300">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>
                <div className="flex gap-x-3 items-center justify-center mt-[30px]">
                    <img src={BannerImage1}></img>
                    <img src={BannerImage2}></img>
                    <img src={BannerImage3}></img>
                </div>
            </div>
        </section>
        </div>
        {/* section2 */}

        <section className="flex flex-col items-center justify-center w-[1440px] h-[336px] gap-[10px]" >
            <div className="w-[1200px] h-[156px] flex items-center justify-center ">
                <Quote></Quote>
            </div>
        </section>

        {/* section 3 */}
<div className="w-full bg-richblack-500 h-[1px]"></div>
        <section>
            <div className="flex flex-col">
                <div className="flex w-[1440px] h-[552px] gap-[98px] items-center justify-center"> 
                    <div className="w-10/12 flex gap-x-40">
                    <div className="flex flex-col w-[486px] h-[372px]">
                        <h1 className="font-semibold text-[36px] font-inter text-transparent bg-clip-text bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] " >Our Founding Story</h1>
                        <div className="text-md font-inter text-[16px] text-richblack-300 mt-[20px]">
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className="mt-[20px]">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>
                    </div>
                    <div >
                        <img src={FoundingStory}>
                    
                        </img>
                    </div>
                    </div>
                </div>
                <div className="flex w-[1440px] h-[416px] items-center justify-center gap-x-40">
                    <div className="w-[486px] h-[212px]">
                        <h1 className="font-inter font-semibold text-[36px] text-transparent bg-clip-text bg-gradient-to-r from-[#E65C00]  to-[#F9D423] mb-[15px]">Our Vision</h1>
                        <p className="text-richblack-300 font-inter text-[16px] font-medium">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className="w-[486px] h-[236px]">
                        <h1 className="font-inter font-semibold text-[36px] text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF]  to-[#12D84A] mb-[15px]">Our Mission</h1>
                        <p className="text-richblack-300 font-inter text-[16px] font-medium">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>

                </div>
            </div>
        </section>

        {/* section4  */}

        <StatsComponent/>

        {/* section5 */}

        <section className="mx-auto flex flex-col items-center justify-between gap-5 ">
            <LearningGrid/>
            <ContactFormSection/>
        </section>
        <section className="w-[1440px] h-[400px] gap-[52px] flex flex-col items-center justify-center">
            <div className="font-semibold text-[36px]">
                Reviews from other learners
            </div>
            <ReviewSlider/>
        </section>
       
    </div>
     <Footer/>
     </div>
  )
}
