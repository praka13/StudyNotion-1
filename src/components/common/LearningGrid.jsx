import React from 'react';
import HighLightText from './HomePage/HighLightText';
import Button from './HomePage/Button';

const learningGridArray=[
    {
        order:-1,
        heading:"World-Class Learning for",
        highlightText:"AnyOne,AnyWhere",
        desc:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btnText:"Learn More",
        btnLink:"/"
    },
    {
        order:1,
        heading:"Curriculum Based on Industry Needs",
        desc:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        order:2,
        heading:"Our Learning Methods",
        desc:"The learning process uses the namely online and offline."
    },
    {
        order:3,
        heading:"Certification",
        desc:"You will get a certificate that can be used as a certification during job hunting."
    },
    {
        order:4,
        heading:'Rating "Auto-grading"',
        desc:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
    },
    {
        order:5,
        heading:'Ready to Work',
        desc:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
    },
    
]

export const LearningGrid = () => {
  return (
    <div className="grid mx-auto grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit">
        {
            learningGridArray.map((card,index)=>{
                return(
                    <div key={index}
                    className={`${index===0  && "lg:col-span-2 lg:h-[280px] p-5"}
                    ${
                        card.order%2===1?"bg-richblack-700 lg:h-[280px] p-5":`${(card.order===-1)?("bg-transparent lg:h-[280px] p-5"):("bg-richblack-800 lg:h-[280px] p-5")}`
                    }
                    ${card.order===3 && "lg:col-start-2 lg:h-[280px] p-5"}
                    `}>

                        {
                            card.order<0?
                            (
                                <div className="lg:w-[90%] flex flex-col pb-5 gap-3">
                                    <div className="text-4xl font-semibold">
                                        {card.heading} <HighLightText text={card.highlightText} textColor={"text-[#5433FF]"}/>
                                    </div>
                                    <p className="font-medium">
                                        {card.desc}
                                    </p>
                                    <div className="w-fit">
                                        <Button active={true} linkto={card.btnLink}>{card.btnText}</Button>
                                    </div>
                                </div>
                            ):(<div className="flex flex-col gap-8 p-7">
                                <h1 className="text-richblack-5 text-lg">
                                    {card.heading}
                                </h1>
                                <p className="text-richblack-300 font-medium">
                                    {card.desc}
                                </p>
                            </div>)
                        }

                    </div>
                )
            })
        }

    </div>
  )
}
