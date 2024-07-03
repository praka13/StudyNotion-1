import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';

import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; 

export const Upload = ({
    name,
    setValue,
    register,
    errors,
    getValues,

}) => {

    const inputRef=useRef(null);



    const {courses,editCourse}=useSelector((state)=>state.course);
    const [selectedFile,setSelectedFile]=useState(null);
    const [previewSource,setPreviewSource]=useState(
    editCourse?courses.thumbNail:""
    );

    const previewFile=(file)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setPreviewSource(reader.result);
            console.log(previewSource);
        }
    }

    const onDrop=(acceptedFiles)=>{
        const file=acceptedFiles[0];
        if(file){
            
           previewFile(file);
           
           setSelectedFile(file);
            
        }
    }

    const {getRootProps,getInputProps,isDragActive}=useDropzone({
        accept:({"image/*":[".jpeg",".png",".jpg"]}),onDrop
    })
    useEffect(()=>{
        register(name,{required:true})
    },[register])

    useEffect(()=>{
        setValue(name,selectedFile)
    },[selectedFile,setValue])
  return (
    <div className='mt-[26px]'>
        <label className='text-sm font-inter text-[14px] mb-[6px]'>Course ThumbNail<sup className='text-pink-400'>*</sup></label>
        <div className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[200px]  cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 mt-[6px]`}>

            {
                previewSource?(

                    (<div>
                                         <img
                                        src={previewSource} 
                                         />
                            <button
               type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
                                 </div>)
                   
                ):(<div {...getRootProps()} className='w-[500px] h-[100px] flex flex-col items-center justify-center'>

                        <input {...getInputProps()} ></input>
                       <div className='w-[46px] h-[46px] p-[12px] flex items-center justify-center bg-pure-greys-800 rounded-full'>
                            <FiUploadCloud fontSize={30} className='text-yellow-50'/>
                        </div>
                      <p className='text-xs font-inter text-[12px] text-richblack-200 flex mt-[10px]'>Drag and drop an image,or click to <p className='text-yellow-50'> Browse</p> </p>

                      <ul className='w-[383px] h-[40px] flex justify-center items-center gap-[52px] list-disc text-xs font-inter text-[12px] text-richblack-200' >
                        <li>Aspect Ratio 16:9</li>
                        <li>Recommended Size 1024x576</li>
                      </ul>

                      
    
                  </div>)
            }
            {/* {
            //     previewSource ? (<div>
            //         {
            //             !video ? (<div>
            //                 <img
            //                 src={previewSource} 
            //                 />
            //             </div>):(<Player aspectRatio="16:9" playsInline src={previewSource}/>)
            //         }
            //                     {!viewData && (
            //   <button
            //     type="button"
            //     onClick={() => {
            //       setPreviewSource("")
            //       setSelectedFile(null)
            //       setValue(name, null)
            //     }}
            //     className="mt-3 text-richblack-400 underline"
            //   >
            //     Cancel
            //   </button>
            // )}
            //     </div>)
            //     :(<div {...getRootProps()}>

            //         <input {...getInputProps()} ></input>
            //         <div>
            //             <FiUpload/>
            //         </div>
            //         <p>Drag and drop a {!video?("image"):("video")},or click to {" "} Browse a File </p>

            //     </div>)
            } */}
        </div>
        {
            errors[name]&&
            (
                <span>
                    Please put course Thumbnail 
                </span>
            )
        }

    </div>
  )
}
