import React from 'react'

const stats=[
    {count:"5K",label:"Active Students"},
    {count:"10+",label:"Mentors"},
    {count:"300+",label:"Courses"},
    {count:"50+",label:"Awards"},
]

export const StatsComponent = () => {
  return (
    <section className="w-[1440px] h-[254px] gap-[10px] flex items-center justify-center bg-richblack-700">
    <div className="flex gap-x-[12px] items-center justify-center text-center">
        {
            stats.map((stat,index)=>{
                return(
                    <div key={index} className="flex flex-col items-center justify-center text-center w-[292.5px] h-[74px]">
                        <h1 className="font-bold font-inter text-[30px] text-center text-richblack-5">{stat.count}</h1>
                        <h2 className="font-semibold font-inter text-[16px] text-richblack-500">{stat.label}</h2>
                    </div>

                )

            })
        }

    </div>
    </section>
  )
}
