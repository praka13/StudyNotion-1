import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

export const TagInput = ({
    name,
    register,
    setValue,
    getValues,
    error

}) => {
    //let array=[];
    const {courses,editCourse}=useSelector((state)=>state.course);
    const[tags,setTags]=useState(
        editCourse?(courses.tag):[]
        );
    useEffect(()=>{
        register(name,{required:true});
        //array=[];
    },[])

    useEffect(()=>{
        setValue(name,tags);
    },[tags]);

    const handleKeyDown=(event)=>{
        if(event.key==="Enter" || event.key===","){
            event.preventDefault()
            const tagValue=event.target.value;

            if(tagValue&&!tags.includes(tagValue)){
                const newTag=[...tags,tagValue]
                setTags(newTag);
                console.log(tags);
                
                event.target.value=""
            }

            
        }
      

    }

    const deleteHandler=(tagIndex)=>{

        const newTag=tags.filter((_,index)=>index!==tagIndex);
        setTags(newTag)

    }
  return (
    <div className='mt-[24px] '>
        <div>
            <label htmlFor={name} className='text-sm font-inter text-[14px] '>Tag<sup className='text-pink-400'>*</sup></label>
            <div className='flex gap-x-5 mt-[6px]'>
                {
                    tags.map((tag,index)=>{
                        
                        return(<div className='text-black rounded-2xl bg-yellow-5 w-fit flex items-center justify-center p-[4px]' key={index}>
                               {tag}
                        <button onClick={()=>deleteHandler(index)}>
                            <MdClose/>
                        </button>
                        </div>
                    )})
                }
            </div>
            <input id={name} name={name} onKeyDown={handleKeyDown} placeholder='Enter Tags' className='text-richblack-100 mt-[6px] w-full h-[48px] bg-richblack-700 p-[12px] rounded-md'></input>
        </div>

    </div>
  )
}
