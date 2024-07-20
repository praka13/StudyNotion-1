import React, { useState } from 'react';
import { Chart,registerables } from 'chart.js';
import {Pie} from "react-chartjs-2";

Chart.register(...registerables);


export const InstructorChart = ({courses}) => {
    const [currentChart,setCurrentChart]=useState("students");
    //function to generate random colors

    const generateRandomColors=(numColors)=>{
        const colors=[];
        for(let i=0;i<numColors;i++){
            const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
            colors.push(color);


        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents={
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalStudentsEnrolled),
                backgroundColor:generateRandomColors(courses.length)
            }
        ]
    }


    //create data for chart displaying income info

    const chartDataForIncome={
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalAmountGenerated),
                backgroundColor:generateRandomColors(courses.length)
            }
        ]
    }

    //create options

    const options={};
  return (
    <div >
        <p className='text-[20px] font-bold text-richblack-5'>Visualise</p>
        <div className='mt-[10px] mb-[10px]'>
            <button onClick={()=>setCurrentChart("students")} className={`mr-[25px] px-[12px] rounded-lg ${currentChart==="students"?"bg-richblack-400 text-yellow-50":"bg-transparent text-yellow-400"}`}>
                Student
            </button>
            <button onClick={()=>setCurrentChart("income")} className={` px-[12px] rounded-lg  ${currentChart==="income"?"bg-richblack-400 text-yellow-50":"bg-transparent text-yellow-400"}`}>
                Income
            </button>

        </div>
        <div className='w-[500px] h-[500px]'>
            <Pie data={currentChart==="students"?chartDataForStudents:chartDataForIncome}
            options={options}
            />
        </div>

    </div>
  )
}
