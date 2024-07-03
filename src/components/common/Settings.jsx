import React ,{useEffect} from 'react'


import { UpdateProfile } from './UpdateProfile';
import { ChangePassword } from '../ChangePassword';
import { DeleteProfile } from './DeleteProfile';
import { FileUploadSection } from './FileUploadSection';


export const Settings = () => {

  return (
    <div>
        <p className="w-[1217px] h-[120px] mt-[37px] ml-[40px] gap-[24px] font-medium font-inter text-[30px] text-richblack-5">Edit Profile</p>

        <div>
          <FileUploadSection/>
        </div>
        <div>
          <UpdateProfile/>
        </div>
        <div>
          <ChangePassword/>
        </div>
        <div>
          <DeleteProfile/>
        </div>
    </div>
  )
}
