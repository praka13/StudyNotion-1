import React, { useEffect, useState } from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from 'react-router-dom';
import {NavbarLinks} from "../../data/navbar-links";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { ProfileDropDown } from './ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import {courseEndpoints } from '../../services/apis';
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { setUser } from '../../slices/profileSlice';

// const subLinks=[
//     {
//         title:"python",
//         link:"/catalog/python",
//     },
//     {
//         title:"web-dev",
//         link:"/catalog/web-development",
//     }
// ];






export const NavBar = () => {

    const location=useLocation();

    const dispatch=useDispatch();

function matchRoute(route){
    return matchPath({path:route},location.pathname)
}



    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);
    console.log(token);
    console.log(user);



   const [subLinks,setSubLinks]=useState([]);

    const fetchSubLinks=async()=>{
        try{
            const result=await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API);
            console.log("Printing SubLink Results" ,result.data.allCategories);
            setSubLinks(result.data.allCategories);
            console.log(subLinks);


        }
        catch(err){
            console.log("Could not fetch category details")
        }
    }

    useEffect(()=>{
       fetchSubLinks();
    //    dispatch(setUser(user));

 

    },[])

   // const [slink,setLink]=useState("/");

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

            <Link to="/">
                <img src={logo} width={160} height={42} loading='lazy'></img>
            </Link>

            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link,index)=>(
                            
                                <li key={index}>
                                {
                                    link.title==="Catalog" ? (<div className='relative flex gap-2 group'>
                                       
                                       <p>{link.title}</p>
                                           
                                        
                                        <IoIosArrowDropdownCircle className='mt-1'/>

                                        <div className='translate-x-[-50%] translate-y-[25%] invisible absolute left-[50%] top-[50%]
                                         flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                         opacity-0 transition-all duration-200 group-hover:visible
                                         group-hover:opacity-100 w-40'>
                                        
                                        <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45
                                        rounded bg-richblack-5 translate-y-[-38%] translate-x-[-50%] '>

                                        </div>
                                            <div className='text-[10px] font-extrabold'>
                                            {
                                            
                                                    
                                                      subLinks.map((subLink,index)=>(
                                                        
                                                           <Link to={`${subLink.categoryName}`} key={index}>


                                                            <p>{subLink.categoryName}</p>              



                                                            </Link>
                                                            
                                                      ))
                                                    
                                          
                                        }
                                            </div>

                                        </div>

                                        
                                    </div>):(
                                        <Link to={link?.path}><p className= {`${matchRoute(link?.path) ? ('text-yellow-25'):"text-richblack-200"} `}>{link?.title}</p></Link>
                                    )
                                }

                            </li>
                            
                        ))
                    }

                </ul>
            </nav>

            {/* Login/SignUp/Dashoard */}

            <div className='flex gap-x-4 items-center'>

                {
                    user && user?.accountType!=="Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart/>
                            {
                                totalItems>0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token===null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Login
                            </button>
                        </Link>
                    )
                }
                {
                    token===null && (

                        <Link to="/signUp">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>

                    )
                }
                {
                   token!==null && <ProfileDropDown/>
                }

            </div>

        </div>
    </div>
  )
}
