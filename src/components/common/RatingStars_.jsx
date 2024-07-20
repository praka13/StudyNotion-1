import React, { useEffect, useState } from 'react';
import {
    TiStarFullOutline,
    TiStarHalfOutline,
    TiStarOutline,
  } from "react-icons/ti"

  function getRatingStars({ReviewCount}){
    const [starCount,setStarCount]=useState({
        full:0,
        half:0,
        empty:0
    })

    useEffect(()=>{
        const wholeStars=Math.floor(ReviewCount);
        setStarCount({
            full:wholeStars,
            half:Number.isInteger(ReviewCount)?0:1,
            empty:Number.isInteger(ReviewCount)?5-wholeStars:4-wholeStars
        })
    },[ReviewCount])
  

return(
    <div className='flex gap-1 text-yellow-100'>
        {
            [...new Array(starCount.full)].map((_,i)=>{
                return(
                    <TiStarFullOutline key={i} size={20}/>
                )
            })
        }
        {
            [...new Array(starCount.half)].map((_,i)=>{
                return(
                    <TiStarHalfOutline key={i} size={20}/>
                )
            })
        }
        {
            [...new Array(starCount.empty)].map((_,i)=>{
                return(
                    <TiStarOutline key={i} size={20}/>
                )
            })
        }
    </div>
    
    
    )
  }

    export default getRatingStars;
