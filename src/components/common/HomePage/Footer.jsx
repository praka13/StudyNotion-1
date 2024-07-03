import React from 'react';
import LogoImage from "../../../assets/Logo/Logo-Full-Light.png";
import { FaGoogle } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FooterLink2 } from '../../../data/footer-links';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className='bg-[#424854] h-[728px]'>
        <div className='w-11/12 flex items-center justify-center mt-10 '>
            <div className='flex flex-row mt-10 gap-6 '>
                <div className='flex flex-col gap-3'>
                    <img src={LogoImage} className='w-[150px]'></img>
                    <div className='text-[16px] text-[#AFB2BF]'>Company</div>
                   <div className='gap-3'>
                   <div className='text-[14px] text-[#6E727F] font-[400]'>About</div>
                   <div className='text-[14px] text-[#6E727F] font-[400]'>Careers</div>
                   <div className='text-[14px] text-[#6E727F] font-[400]'>Affiliates</div>

                   </div>
                   <div className='flex flex-row gap-x-3'>
                    <TiSocialFacebookCircular className='w-[18px] h-[18px] '/>
                    <FaGoogle className='w-[18px] h-[18px]'/>
                    <FaTwitterSquare className='w-[18px] h-[18px]'/>
                    <FaYoutubeSquare className='w-[18px] h-[18px]'/>

                   </div>


                </div>
             

              <div className='flex flex-col gap-3'>
     
     <div className='text-[16px] text-[#AFB2BF] font-[600]'>Resources</div>
     <div className='text-[14px] text-[#6E727F] font-[400]'>Blog</div>
     <div className='text-[14px] text-[#6E727F] font-[400]'>Chart Sheet</div>
     <div className='text-[14px] text-[#6E727F] font-[400]'>Code Challenges</div>
     <div className='text-[14px] text-[#6E727F] font-[400]'>Docs</div>
     <div className='text-[14px] text-[#6E727F] font-[400]'>Projects</div>
     <div className='text-[14px] text-[#6E727F] font-[400]'>Videos</div>
     <div className='text-[14px] text-[#6E727F] font-[400]'>WorkSpaces</div>

     <div className='text-[16px] text-[#AFB2BF] font-[600] mt-7'>Support</div>
     <div className='text-[14px] text-[#6E727F] font-[400]'>Help Center</div>


          </div>

     
      <div className='flex flex-col gap-3'>

      <div className='text-[16px] text-[#AFB2BF] font-[600]'>Plans</div>
      <div className='text-[14px] text-[#6E727F] font-[400]'>Paid Memberships</div>
    <div className='text-[14px] text-[#6E727F] font-[400]'>For Students</div>
    <div className='text-[14px] text-[#6E727F] font-[400] mb-7'>Business Solutions</div>

    <div className='text-[16px] text-[#AFB2BF] font-[600]'>Community</div>
    <div className='text-[14px] text-[#6E727F] font-[400]'>Forums</div>
    <div className='text-[14px] text-[#6E727F] font-[400]'>Chapters</div>
    <div className='text-[14px] text-[#6E727F] font-[400]'>Events</div>
  

    </div>

    <div className='flex flex-col gap-3'>

    <div className='text-[16px] text-[#AFB2BF] font-[600]'>{FooterLink2[0].title}</div>

    <Link to={FooterLink2[0].links[0].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[0].title}</div></Link>
    <Link to={FooterLink2[0].links[1].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[1].title}</div></Link>
    <Link to={FooterLink2[0].links[2].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[2].title}</div></Link>
    <Link to={FooterLink2[0].links[3].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[3].title}</div></Link>
    <Link to={FooterLink2[0].links[4].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[4].title}</div></Link>
    <Link to={FooterLink2[0].links[5].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[5].title}</div></Link>
    <Link to={FooterLink2[0].links[6].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[6].title}</div></Link>
    <Link to={FooterLink2[0].links[7].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[7].title}</div></Link>
    <Link to={FooterLink2[0].links[8].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[8].title}</div></Link>
    <Link to={FooterLink2[0].links[9].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[9].title}</div></Link>
    <Link to={FooterLink2[0].links[10].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[10].title}</div></Link>
    <Link to={FooterLink2[0].links[11].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[11].title}</div></Link>
    <Link to={FooterLink2[0].links[12].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[12].title}</div></Link>
    <Link to={FooterLink2[0].links[13].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[13].title}</div></Link>
    <Link to={FooterLink2[0].links[14].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[14].title}</div></Link>
    <Link to={FooterLink2[0].links[15].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[15].title}</div></Link>
    <Link to={FooterLink2[0].links[16].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[0].links[16].title}</div></Link>
    

    
    </div>

    <div className='flex flex-col gap-3'>
    <div className='text-[16px] text-[#AFB2BF] font-[600]'>{FooterLink2[1].title}</div>

    <Link to={FooterLink2[1].links[0].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[0].title}</div></Link>
    <Link to={FooterLink2[1].links[1].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[1].title}</div></Link>
    <Link to={FooterLink2[1].links[2].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[2].title}</div></Link>
    <Link to={FooterLink2[1].links[3].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[3].title}</div></Link>
    <Link to={FooterLink2[1].links[4].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[4].title}</div></Link>
    <Link to={FooterLink2[1].links[5].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[5].title}</div></Link>
    <Link to={FooterLink2[1].links[6].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[6].title}</div></Link>
    <Link to={FooterLink2[1].links[7].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[7].title}</div></Link>
    <Link to={FooterLink2[1].links[8].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[8].title}</div></Link>
    <Link to={FooterLink2[1].links[9].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[9].title}</div></Link>
    <Link to={FooterLink2[1].links[10].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[10].title}</div></Link>
    <Link to={FooterLink2[1].links[11].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[11].title}</div></Link>
    <Link to={FooterLink2[1].links[12].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[12].title}</div></Link>
    <Link to={FooterLink2[1].links[13].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[1].links[13].title}</div></Link>


    </div>

    <div className='flex flex-col gap-3'>

    <div className='text-[16px] text-[#AFB2BF] font-[600]'>{FooterLink2[2].title}</div>

    <Link to={FooterLink2[2].links[0].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[2].links[0].title}</div></Link>
    <Link to={FooterLink2[2].links[1].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[2].links[1].title}</div></Link>
    <Link to={FooterLink2[2].links[2].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[2].links[2].title}</div></Link>
    <Link to={FooterLink2[2].links[3].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[2].links[3].title}</div></Link>
    <Link to={FooterLink2[2].links[4].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[2].links[4].title}</div></Link>
    <Link to={FooterLink2[2].links[5].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[2].links[5].title}</div></Link>
    <Link to={FooterLink2[2].links[6].link}><div className='text-[14px] text-[#6E727F] font-[400]'>{FooterLink2[2].links[6].title}</div></Link>
      
    </div>

    

  
         

             

            </div>

  

                       


        </div>

        <div className='w-11/12 flex flex-row items-start justify-evenly mt-10 gap-20 border-t-richblack-500'>

          <div className='flex flex-row gap-x-3'>

            <div className='text-[14px] text-[#6E727F] font-[400]'>Privacy Policy</div>
            <div className='text-[14px] text-[#6E727F] font-[400]'>Cookie Policy</div>
            <div className='text-[14px] text-[#6E727F] font-[400]'>Terms</div>

          </div>


          <div className='flex flex-row gap-x-3'>

            <div className='text-[14px] text-[#6E727F] font-[400]'>Made with <div className='text-[red]'>♥</div> Aditya&Co © 2023 Studynotion</div>
            
          </div>

        </div>

       

    </div>
  )
}
