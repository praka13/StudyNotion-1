import React from 'react'
import Template from '../components/common/Template';
import loginImg from "../assets/Images/login.webp";



const Login = () => {
  return (
    <div>
 
        <Template
        title="Welcome Back"
        desc1="Build Skills for today , tomorrow and beyond"
        desc2="Education to future proof your career"
        image={loginImg}
        formtype="login"
       


        
        
        ></Template>
    </div>
  )
}

export default Login; 