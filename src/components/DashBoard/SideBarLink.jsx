import React from 'react';
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

export const SideBarLink = ({link,iconName}) => {

    const Icon=Icons[iconName];
    const location=useLocation();
    const dispatch=useDispatch();

    function matchRoute(route){
        return matchPath({path:route},location.pathname);
    }
  return (
    <NavLink to={link.path} className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)?"bg-yellow-600":"bg-opacity-0"}`}>

        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path)?"opacity-100":"opacity-0"}`}></span>

        <div className="flex items-center justify-center text-sm font-medium text-richblack-300">

            <Icon className="text-lg"/>
            <span>{link.name}</span>


        </div>

    </NavLink>
  )
}
