import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { Player } from 'video-react';
import { FiUploadCloud } from 'react-icons/fi';

export const UploadVideo = (
    {
        name,
        label,
        register,
        setValue,
        errors,
        viewData,
        editData
    }
) => {

    const [selectedFile,setSelectedFile]=useState(null);
    const [previewSource,setPreviewSource]=useState(
        viewData?viewData:editData?editData:""
    )

    useEffect(()=>{
     if(previewSource){
        //previewFile(previewSource);
        setSelectedFile(previewSource);
     }
     else{
        return
     }
    },[])

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

    useEffect(()=>{
        register(name,{required:true})
    },[])

    useEffect(()=>{
        setValue(name,selectedFile);
    },[selectedFile])

    const {getRootProps,getInputProps,isDragActive}=useDropzone({
        accept:({"video/*":[".mp4"]}),onDrop
    })


  return (
    <div className='w-[600px]'>
        <label className='text-sm font-inter text-[14px] text-richblack-50' >Lecture Video<sup className='text-pink-400'>*</sup></label>
        <div className={`${isDragActive?"bg-richblack-600":"bg-richblack-700"} flex min-h-[200px]  cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 mt-[6px]`}>

            {
                previewSource?(<div>
                    <Player aspectRatio='16:9' playsInline src={previewSource}></Player>
                    {
                        !viewData&&(<button
                        onClick={()=>{
                            setPreviewSource("");
                            setSelectedFile(null);
                            setValue(name,null)
                        }}
                        >
                            Cancel
                        </button>)
                    }
                </div>):(<div {...getRootProps()} className='w-[500px] h-[100px] flex flex-col items-center justify-center'>

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
            
        </div>

    </div>
  )
}
