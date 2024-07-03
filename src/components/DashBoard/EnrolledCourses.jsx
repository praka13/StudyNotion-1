import React ,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../services/apiconnector';
import { profileEndpoints } from '../../services/apis';
import ProgressBar from '@ramonak/react-progress-bar';
import toast from 'react-hot-toast';

export const EnrolledCourses = () => {

    const {token}=useSelector((state)=>state.auth);
    const [enrolledCourses,setEnrolledCourses]=useState(null);

    const getEnrolledCourses=async()=>{
        try{
            const response=await apiConnector("GET",profileEndpoints.GET_USER_ENROLLED_COURSES_API,null,{ Authorisation: `Bearer ${token}`,});
            console.log(response.data.data);
            setEnrolledCourses(response.data.data);
            toast.success("Got Courses")
        }
        catch(err){
            console.log(err);
            toast.error("not got courses")

        }
    }

    useEffect(()=>{
      getEnrolledCourses();  
    },[])

  return (
    <div className="text-white">
        <div>
            Enrolled Courses
        </div>
        {
            !enrolledCourses?(<div>Loading...</div>):(
                !enrolledCourses.length?(<p>You have not enrolled in any course</p>):(
                    <div>
                        <div>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p> Progress</p>
                            {
                                enrolledCourses.map((course,index)=>{
                                    <div key={index}>
                                        <div>
                                            <img src={course.thumbNail}></img>
                                            <div>
                                                <p>{course.courseName}</p>
                                                <p>{course.courseDescription}</p>
                                            </div>
                                        </div>
                                       <div>
                                       {course?.totalDuration}
                                       </div>
                                       <div>
                                        <p>Progress:{course?.progressPercentage || 0 }</p>
                                        <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                        />
                                       </div>
                                    </div>
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
