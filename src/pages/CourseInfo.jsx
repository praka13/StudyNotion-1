import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { courseEndpoints } from '../services/apis';
import getAvgRating from '../utils/getAvgRating';
import { RatingStars } from '../components/common/RatingStars';
import { FaRegClock } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import boxOffice from "../assets/Images/boxoffice.png";
import { PiCursor } from "react-icons/pi";
import { FaUniversalAccess } from "react-icons/fa6";
import { PiCertificateThin } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/studentPaymentAPI';
import { profileEndpoints } from '../services/apis';
import { addToCart } from '../slices/cartSlice';
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';


export const CourseInfo = () => {
    const {courseId}=useParams();

    const {user}=useSelector((state)=>state.profile);
    const [loading,setLoading]=useState(false);
   
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [course,setCourse]=useState([]);
    const[enrolledCourses,setEnrolledCourses]=useState([]);
 
    const[avgCount,setAvgCount]=useState(0);

    const {token}=useSelector((state)=>state.auth);

    let sum=0;
    let timeDuration=0;


    const getEnrolledCourses=async()=>{
        try{
            const response=await apiConnector("GET",profileEndpoints.GET_USER_ENROLLED_COURSES_API2,null,{ Authorisation: `Bearer ${token}`});
            console.log(response.data.data);
            setEnrolledCourses(response.data.data);
            //console.log(enrolledCourses);
          
        }
        catch(err){
            console.log(err);
           

        }
    }
  
   

    const handleBuyCourse=()=>{
        if(token){

            buyCourse(token,[courseId],user,navigate,dispatch);
            return

        }
    }

    const formattedDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
          month: "numeric",
          year: "numeric",
        })
    
      }
    
    
    const getCourseDetails=async(courseId)=>{
        try{

            setLoading(true);

            const result=await apiConnector("POST",courseEndpoints.COURSE_DETAILS_API2,{courseId});

            console.log(result.data.data);

            setCourse(result.data.data);
            
            const count=getAvgRating(result.data.data.ratingandReviews);
            setAvgCount(count);
            setLoading(false);

        }
        catch(err){

            console.log(err);



        }
    }

    const handleCopy=()=>{
        copy(window.location.href);
        toast.success("Link Copied to ClipBoard")

    }


    useEffect(()=>{

        //console.log(user.courses.includes(courseId));
        getEnrolledCourses();
       
        
        getCourseDetails(courseId);
       
        
       // setAvgCount(count);
       
       
    },[]);
  return (
        <div>
            {
                loading?(<div className='h-[600px] w-[1200px] flex items-center justify-center text-richblack-5 text-[35px]'>Loading.....</div>):(    <div className='h-fit text-white mb-[140px]'>
                <div className='w-[1440px] h-[318px] px-[120px] py-[32px] flex bg-richblack-800'>
                    <div className='w-[768px] h-[254px]'>
                        <p className='font-inter text-sm text-richblack-300'>Home / Learning / <span className='text-yellow-50'>{course?.category?.categoryName}</span></p>
                        <p className='mt-[15px] font-medium font-inter text-[30px] text-richblack-5'>{course.courseName}</p>
                        <p className='mt-[15px] text-sm font-inter text-[14px] text-richblack-200'>{course.courseDescription}</p>
                        <div className='flex gap-x-3 mt-[15px]'> 
                            <p className='font-semibold text-yellow-100 text-[18px]'>{avgCount}</p>
                            <p><RatingStars ReviewCount={avgCount}/></p>
                            <p className='text-richblack-25 text-[16px] font-inter text-md'>({course?.ratingandReviews?.length} ratings)</p>
                            <p className='text-richblack-25 text-[16px] font-inter text-md'>{course?.studentsEnrolled?.length} students</p>
                        </div>
                        <p className=' mt-[15px] text-richblack-25 text-[16px] font-inter text-md'>Created by {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className='mt-[15px] flex gap-x-2 items-center justify-start text-richblack-25 text-[16px] font-inter text-md'>
                            <FaRegClock/> 
                            <div>Created at {formattedDate(course?.createdAt)}</div>
                            <CiGlobe/>
                            <div>English</div>
                            
                        </div>
        
        
                    </div>
                    <div className='h-[254px] w-[1px] bg-richblack-600'>
        
                    </div>
                    <div className='ml-[10px] w-[384px] h-[669px] bg-richblack-800'>
        
                        <img src={course?.thumbNail} className='w-[384px] h-[201px] rounded-lg'></img>
                        <div className='p-[24px]'>
                                 <p className='mb-[12px] font-bold font-inter text-[30px] text-richblack-5'>Rs. {course?.price}</p>
                                 {
                                    token&&((user?.accountType==="Instructor" && (user?.courses).includes(courseId))||(user?.accountType==="Student" && enrolledCourses.includes(courseId)))&&(<button onClick={()=>navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSection[0]?._id}`)} className='mb-[12px] w-[336px] h-[48px] bg-yellow-50 rounded-xl text-richblack-900 font-medium'>Go To Course</button>)
                                 }
                                {
                                   
                                    token&&user?.accountType==="Student"&&!enrolledCourses.includes(courseId)&&(<button className='mb-[12px] w-[336px] h-[48px] bg-yellow-50 rounded-xl text-richblack-900 font-medium' onClick={()=>dispatch(addToCart(course))}>Add to Cart</button>)
                                }
                                 {token && user?.accountType==="Student"&&!enrolledCourses.includes(courseId)&&<button onClick={()=>handleBuyCourse()} className='w-[336px] h-[48px] bg-richblack-900 rounded-xl text-richblack-5 font-medium'>Buy Now</button>}
                                 <p className='mt-[10px] ml-[50px] text-[14px] text-richblack-25 font-normal'>30-Day Money-Back Guarantee</p>
                        </div>
        
                        <div>
                            <p className='font-medium font-inter text-richblack-5 ml-[33px] text-[16px]'>This Course includes:</p>
                            <div className='ml-[33px] mt-[15px]'>
                                <p className='flex gap-x-1 items-center font-medium font-inter text-[14px] text-caribbeangreen-100'><FaRegClock/> 8 Hours on Demand-Video</p>
                                <p className='flex gap-x-1 items-center font-medium font-inter text-[14px] text-caribbeangreen-100'><PiCursor/> Full Lifetime Access</p>
                                <p className='flex gap-x-1 items-center font-medium font-inter text-[14px] text-caribbeangreen-100'><FaUniversalAccess/> Access on Mobile and TV  </p>
                                <p className='flex gap-x-1 items-center font-medium font-inter text-[14px] text-caribbeangreen-100'><PiCertificateThin/> Certificate of completion</p>
                            </div>
                        </div>
                        <button onClick={()=>handleCopy()} className='flex items-center justify-center w-full mt-[60px] font-inter font-medium text-[16px] text-yellow-100 '>
                            Share
                        </button>
        
        
        
                    </div>
                </div>
                <div className='h-fit w-[792px] border-[1px] border-richblack-700 ml-[50px] mt-[50px] p-[32px] '>
        
                    <div className='font-medium font-inter text-[30px]'>What you'll learn</div>
                    <div className='mt-[15px] text-sm font-inter text-[14px] text-[#C5C7D4]'>{course.whatYouWillLearn}</div>
        
                </div>
        
                <div className='h-fit w-[792px] ml-[50px] mt-[50px]'> 
                <p className="text-semibold text-[24px] text-richblack-5 font-inter">Course Content</p>
                <div className='flex gap-x-3 items-center mt-[10px] text-xs font-inter text-[14px] text-richblack-50'>
                <p>{course?.courseContent?.length} sections</p>
                <div><GoDotFill/></div>
                <p>
                    {
                        course?.courseContent?.map((subS,index)=>{
        
                            sum+=subS?.subSection?.length
        
                        })
                    }
                    {sum} Lectures
                </p>
                <div ><GoDotFill/></div>
                <p>
                    {
                        course?.courseContent?.map((subS,index)=>{
                            subS?.subSection?.map((subSec,index)=>{
                                timeDuration+=Math.floor(subSec?.timeDuration);
                            })
                        })
                    }
                    {Math.floor(timeDuration/3600)}h {Math.floor(timeDuration/60)}min Total Length
                </p>
                </div>
        
                <div>
                   
                    
                     
                        {
                        course?.courseContent?.map((subS,index)=>{
                            let sum=0;
                            return(
                                <details>
                                    <summary className='flex gap-x-3 items-center justify-between w-[792px] h-[54px] px-[16px] py-[32px] bg-richblack-700 border-richblack-5 font-medium font-inter text-[14px] text-richblack-5 mt-[10px] rounded-lg'>
                                    <div className='flex gap-x-2 items-center'>
                                    <RiArrowDropDownLine/>  
                                    <div>
                                    {
                                        subS?.sectionName
                                    }
                                    </div>
                                    </div>
                                   <div className='flex gap-x-3 '>
        
                                    <div className='text-yellow-50'>
                                    {
                                        subS?.subSection?.length
                                    } Lectures
                                    </div>
         
                                    {
                                        subS?.subSection?.map((subSec)=>{
                                            sum+=Math.floor(subSec?.timeDuration);
                                        })
                                    }
                                    <div>
                                    {
                                        Math.floor(sum/60)
                                    } min
                                    </div>
                                    </div>
                                    </summary>
        
                                    {
                                        subS?.subSection?.map((subSec,index)=>{
                                            return(
                                                <details >
                                                    <summary className='flex gap-x-3 justify-between items-center w-[792px] h-[10px] px-[10px] py-[24px] font-medium font-inter text-[14px] text-richblack-5'>
                                                    
                                                        <div className='flex gap-x-2 items-center'>
                                                        {
                                                        subSec?.title
                                                        }
                                                          <RiArrowDropDownLine/>
                                                        </div>
                                                    <div>
                                                    {Math.floor(subSec?.timeDuration/3600)}: {Math.floor(subSec?.timeDuration/60)}: {Math.floor(subSec?.timeDuration%60)}
                                                    </div>
                        
                                                    </summary>
                                                        
                                                        
                                                        <div className='ml-[25px] mt-[5px] font-medium font-inter text-[14px] text-richblack-5'>
                                                        {
                                                        subSec?.description
                                                        }
                                                        </div>
                                    
                                                </details>
        
                                            )
                                        })
                                    }
                                    
                                </details>
                            )
                        })
                    }
                    </div>
                       
                   
                       
                          
                                  
                            
                  
                

                <div className='mt-[30px]'>
                    <p className='font-semibold text-[24px] font-inter text-richblack-5'>Author</p>
                    <div className='flex items-center gap-x-[12px] mt-[10px] mb-[10px]'>
                        <img src={course?.instructor?.image} className='w-[52px] h-[52px] rounded-full'></img>
                        <p className='font-medium font-inter text-[16px] text-richblack-5'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    </div>
                    <p className='h-fit w-[792px] text-richblack-50'>{course?.instructor?.additionalDetails?.about}</p>
                </div>
                
        
        
                </div>
            </div>)
            }
        </div>
  )
}
