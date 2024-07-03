import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const RequirementField = ({
    name,
    register,
    errors,
    setValue,
    getValues
}) => {

    const {courses,editCourse}=useSelector((state)=>state.course);

    const [instructions,setInstructions]=useState("");
    const [instructionsList,setInstructionsList]=useState(
        editCourse?courses.instructions:[]
        );

   
    const addInstructions=()=>{
        if(instructions){
            console.log(instructions);
            setInstructionsList([...instructionsList,instructions]);
            console.log(instructionsList);
            setInstructions("");
        }

    }

    const handleRemove=(tagIndex)=>{
        const inst=instructionsList.filter((_,index)=>tagIndex!==index);
        setInstructionsList(inst);
    }
    useEffect(()=>{
        register(name,{required:true})
    },[])
    useEffect(()=>{
        setValue(name,instructionsList);
    },[instructionsList]);
    const handleClick=(e)=>{
        console.log(e.target.value);
    }
  return (
    <div className='mt-[26px]'>
        <label className='text-sm font-inter text-[14px]'>Course Requirements<sup className='text-pink-400'>*</sup></label>
        <input id={name} name={name} placeholder='Enter Instructions' className='w-full text-richblack-100 h-[48px] rounded-md bg-richblack-700 p-[12px] mt-[6px]' onChange={(e)=>setInstructions(e.target.value)}></input>
        <button type='button' onClick={addInstructions} className='text-bold text-yellow-50 mt-[6px] mb-[6px]'>
            Add
        </button>
        <div className='flex gap-[10px]'>
        {
            instructionsList.map((instruction,index)=>{
                return(
                    <div className="gap-1 flex bg-yellow-50 rounded-xl text-richblack-700 p-[6px]" key={index}>
                        
                        {instruction }
                        
                        <button onClick={()=>handleRemove(index)} className='ml-[1px] text-xs'>
                            remove
                        </button>
                    </div>

                )
            })
        }
        </div>

        {
            errors[name] && (
                <span>
                    Instructions is required
                </span>
            )
        }

   



    </div>
  )
}
