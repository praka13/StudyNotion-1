import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { SideBar } from '../components/DashBoard/SideBar';

export const DashBoard = () => {

    const {loading:authLoading}=useSelector((state)=>state.auth);
    const {loading:profileLoading}=useSelector((state)=>state.profile);

    if(authLoading||profileLoading){
        return (
            <div className="mt-10">
                Loading...
            </div>
        )
    }
  return (
    <div className="flex">
      <div className="w-[222px] min-h-fit">
      <SideBar/>
      </div>
  

   
      <div className="w-11/12 min-h-fit">
        <Outlet/>
      </div>

    

    </div>
  )
}
