import React from 'react';
import {Link} from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
import HighLightText from "../components/common/HomePage/HighLightText";
import Button from "../components/common/HomePage/Button";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/common/HomePage/CodeBlocks";
import { TimeLineSection } from '../components/common/HomePage/TimeLineSection';
import { LearningLanguageSection } from '../components/common/HomePage/LearningLanguageSection';
import { InstructorSection } from '../components/common/HomePage/InstructorSection';
import { ExploreMore } from '../components/common/HomePage/ExploreMore';
import { Footer } from '../components/common/HomePage/Footer';
import { ReviewSlider } from '../components/common/ReviewSlider';



const Home=()=>{
    return(
        <div className='w-screen'>
            {/*Section1*/}
                <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent mt-4'>
                   
                        <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                            <Link to={"/signUp"}> <p>Become an Instructor</p> </Link>
                                <FaArrowRight></FaArrowRight>
                            </div>
                        </div>
                   
                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower Your Future with <HighLightText text={"Coding Skills"} textColor={" text-richblue-200"}/>
                </div>

                <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
                    With our online coding courses,you can learn at your own pace, from anywhere in the world,and get access to a wealth of resources,including hands-on projects,quizzes and prsonalized feedback from instructors 
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <Button active={true} linkto={"/signUp"}>
                        Learn More
                    </Button>

                    <Button active={false} linkto={"/login"}>
                        Book a Demo
                    </Button>

                </div>

               <div className='shadow-blue-200 mx-3 my-12 w-[1010px]'>
               <video
               muted loop autoPlay>
                <source src={banner} type="video/mp4" />

               </video>

                {/*Code Section 1 */}

               </div>

                {/* Code Section 1*/}
                <div>
                <CodeBlocks
                        position={"flex-row"}
                        heading={
                            <div>
                                Unlock Your {" "}
                                <HighLightText text={"coding potential"} textColor={ "text-richblue-200"}/>
                               {" "} with our online courses
                            </div>
                        }
                        subHeading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing your knowledge with you"
                        }
                        ctabtn1={
                            {
                                btnText:"Try it Yourself",
                                linkto:"/signUp",
                                active:true
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                linkto:"login",
                                active:false
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`


                        }
                        codeColor={"text-yellow-25"}

                    />
              
                </div>

                {/* Code Section 2*/}

                <div>
                <CodeBlocks
                        position={"flex-row-reverse"}
                        heading={
                            <div>
                                Start {" "}
                                <HighLightText text={"coding in seconds"} textColor={" text-richblue-200"}/>
                           
                            </div>
                        }
                        subHeading={
                           "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={
                            {
                                btnText:"Continue Lesson",
                                linkto:"/signUp",
                                active:true
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                linkto:"/login",
                                active:false
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`



                        }
                        codeColor={"text-yellow-25"}

                    />
              
                </div>

                <ExploreMore/>

                </div>


             {/*Section2*/}
             <div className='bg-pure-greys-5 text-richblack-200'>
                    <div className='homepage_bg h-[333px]'>

                        <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto justify-center'>
                              
                            <div className='flex flex-row gap-7 text-white mt-[180px]'>

                                <Button active={true} linkto={"/signUp"}>
                                    <div className='flex flex-row items-center justify-center gap-3'>
                                        <div>Explore Full Catalog</div>
                                        <FaArrowRight/>
                                    </div>
                                   
                                </Button>

                                <Button active={false} linkto={"/signUp"}>
                                    <div className='flex flex-row items-center justify-center gap-3'>
                                        <div>Learn More</div>
                                        <FaArrowRight/>
                                    </div>
                                   
                                </Button>  
                             

                            </div>

                        </div>

                    </div>

                    <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-7 mr-14'>

                        <div className='flex flex-row gap-5 mb-10 mt-[110px]'>

                         <div className='text-4xl font-semibold w-[45%] '>
                        Get Skills you need for a <HighLightText text={"Job That is in Demand"} textColor={"text-blue-200"}></HighLightText>
                             </div>


                             <div className='flex flex-col gap-10 w-[40%] items-start'>

                                <p className='text-[16px]'>
                                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                                </p>

                                <Button active={true} linkto={"/signUp"}>
                                    <div>
                                        Learn More
                                    </div>
                                </Button>

                                </div>

                        </div>
                        <TimeLineSection/>
                    <LearningLanguageSection/>

                       
                            </div>




               
             </div>

              {/*Section3*/}

              <div className='flex w-11/12 mx-auto max-w-maxContent flex-col items-center justiy-between gap-8 first-letter bg-richblack-900'>

                <InstructorSection/>

                <h2 className='text-center text-white text-4xl font-semibold mt-10'>Review from Other Learners</h2>

                {/* Review Slider Here */}
                <ReviewSlider/>


              </div>




               {/*Footer*/}
               <Footer/>

        </div>
    )
}

export default Home
  
