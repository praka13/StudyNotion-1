import React from 'react'

const HighLightText = ({text,textColor}) => {
  return (
    <span className={`font-bold ${textColor}`}>
        {" "}
        {text}
    </span>
  )
}

export default HighLightText


