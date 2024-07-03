import React from 'react'

export const IconBtn = ({text,
    onclick,
   
    disabled,
    outline=false,
    customClasses,
    type}) => {
  return (
    <button
    disabled={disabled}
    onClick={onclick}>
        {
           
         
            <span>
                {text}
            </span>
            
         
            
        }
    </button>
  )
}
