import React ,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../services/apiconnector';
import { courseProgressEndPoints, profileEndpoints } from '../../services/apis';
import ProgressBar from '@ramonak/react-progress-bar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { courseEndpoints } from '../../services/apis';

export const EnrolledCourses = () => {
    let arr=[]

    const {token}=useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);
    const [result,setResult]=useState(null);
    const [enrolledCourses,setEnrolledCourses]=useState([]);
    const navigate=useNavigate();

    const findCourseProgress=async(courseId,token)=>{
        console.log("Hello");
        try{
            const result=await apiConnector("POST",courseProgressEndPoints.FIND_COURSE_PROGRESS,{courseId},{
                Authorisation: `Bearer ${token}`,
            })
            console.log(result);
            if(result?.data?.data!==null){
                let count=result?.data?.data?.completedVideos?.length
               return count
                
            }
            else{
                return 0;
            }

        }
        catch(err){
            console.log(err);

        }
    }
    // const getFullCourseDetails=async(courseId)=>{
    //     try{

    //         const result=await apiConnector("POST",courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId},{
    //             Authorisation: `Bearer ${token}`
    //         });
    //         console.log(result);
    //         setResult(result.data.data.completedVideos);

    //     }
    //     catch(err){

    //         console.log(err);

    //     }
    // }

    const convertToHour=(seconds)=>{

        return Math.floor(seconds/3600)
    
      }
    
      const convertToMinutes=(seconds)=>{
        return Math.floor(seconds/60);
      }

    const getEnrolledCourses=async()=>{
        try{
            setLoading(true);
            const response=await apiConnector("GET",profileEndpoints.GET_USER_ENROLLED_COURSES_API,null,{ Authorisation: `Bearer ${token}`});
            console.log(response.data.data);
            setEnrolledCourses(response.data.data);
            console.log(enrolledCourses);
            setLoading(false);
            toast.success("Got Courses")
        }
        catch(err){
            console.log(err);
            toast.error("not got courses")

        }
    }

    const callFuction=async(courseId,token)=>{
        console.log(await findCourseProgress(courseId,token));
    }

    



    console.log(arr);


   
    


    useEffect(()=>{
        getEnrolledCourses();


    

    },[])

  return (
    <div>
        {
            loading?(<div className='h-[600px] w-[1200px] flex items-center justify-center text-richblack-5 text-[35px]'>Loading.....</div>):(
                <div className="text-white h-fit mb-[50px]">

                <div className='w-[1217px] h-[120px] p-[24px]'>
                    <p className='text-sm font-inter text-[14px] text-richblack-300 mb-[24px]'>Home / Dashboard / <span className='text-yellow-50'>Enrolled Courses</span></p>
                    <p className='font-medium text-richblack-5 font-inter text-[30px]'>Enrolled Courses</p>
                </div>
            
                    {
                        (
                            !enrolledCourses.length?(<p className='h-screen'>You have not enrolled in any course</p>):(
                                <div>
                                    <div className={`${enrolledCourses.length>=4?"h-fit":"h-screen"} w-[1132px] px-[30px]`}>
            
                                        <div className='flex w-full bg-richblack-700  items-center justify-start px-[16px] rounded-t-xl'>
                                        <p className="w-[582px] h-[54px] items-center flex text-sm font-medium font-inter text-[14px] text-richblack-50">Course Name</p>
                                        <p className="w-[234px] h-[54px] items-center flex text-sm font-medium font-inter text-[14px] text-richblack-50">Duration</p>
                                        <p className="w-[234px] h-[54px] items-center flex text-sm font-medium font-inter text-[14px] text-richblack-50"> Progress</p>
                                        </div>
                                        {
                                            enrolledCourses.map((course,index)=>{
                                             
                                           
      

                                                
                                               

         
                                              
                                            
                                               
                                                
                                                let sum=0;
                                                let sumLength=0;
                                                    return(
                                                        <div key={index} className='flex' onClick={()=>navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)}>
                                                        <div className='px-[16px] mt-[7px] mb-[7px] w-[582px] h-[84px] items-center flex gap-x-[20px]'>
                                                            <img className='w-[52px] h-[52px] rounded-xl' src={course?.thumbNail}></img>
                                                            <div>
                                                                <p className='font-medium font-inter text-[16px] text-richblack-5'>{course?.courseName}</p>
                                                                <p className='font-medium font-inter text-[16px] text-richblack-300'>{course?.courseDescription}</p>
                                                            </div>
                                                        </div>
                                                       <div className='w-[234px] h-[84px] mt-[20px]'>
                                                       {
            
                                                                    course.courseContent.map((courseC)=>{

                                                                        sumLength+=courseC.subSection.length;
                                                                        courseC.subSection.map((subS)=>{
                                                                        sum+=Math.floor(subS.timeDuration)
            
            
                                                                        
                                                                        })
            
                                                                        
                                                                    
                                                                        
            
            
                                                                    
                                                                    })
            
            
            
                                                                    }
            
                                                                        {convertToHour(sum)} hours {convertToMinutes(sum)} mins {sum%60} secs
            
                                                      
                                                       </div>



                                                       <div  className='w-[234px] h-[84px] mt-[7px] px-[16px]'>
                                                        <p className='mb-[5px] text-xs font-semibold font-inter text-richblack-50 text-[12px]'>Progress:{Math.round((course?.completedLectures)*100/sumLength) || 0}%</p>
                                                        <ProgressBar className='flex items-center'
                                                         completed={Math.round((course?.completedLectures)*100/sumLength) || 0}
                                                        height='8px'
                                                        isLabelVisible={false}
                                                        /> 
                                                       </div>
                                                    </div>
                                                    )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            )

        }
    </div>
  )
}
