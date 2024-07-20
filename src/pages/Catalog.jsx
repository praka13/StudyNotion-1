import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiconnector';
import { catalogData, categories } from '../services/apis';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { CourseSlider } from '../components/common/CourseSlider';
import { Footer } from '../components/common/HomePage/Footer';
import { Course_Card } from '../components/Course_Card';

export const Catalog = () => {

    const {catalogName}=useParams();
    const [catalogPageData,setCatalogPageData]=useState(null);
    const [categoryId,setCategoryId]=useState(null);
    const [loading,setLoading]=useState(false);
    console.log(catalogName);
    const[active,setActive]=useState(false);
    const[active1,setActive1]=useState(false);


    // //Fetch All Categories
    useEffect(()=>{

        const getCategoryDetails=async()=>{

            const res=await apiConnector("GET",categories.CATEGORIES_API);
            const category_id=res.data.data.filter((ct)=>ct.categoryName.split(" ").join("-").toLowerCase()===catalogName)[0]._id;
            setCategoryId(category_id)
            console.log(category_id);
            
           // console.log(categoryId);

        }
        getCategoryDetails()

    },[catalogName]);

    useEffect(()=>{
        const getCategoriesDetail=async()=>{
            try{
                const res=await getCatalogPageDetails(categoryId);
                console.log(res);
                setCatalogPageData(res);

            }
            catch(err){
                console.log(err);
            }
        }
        getCategoriesDetail()
    },[categoryId]);

    const getCatalogPageDetails=async(categoryId)=>{
        let result =[];
        try{

            setLoading(true)

            const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});
            console.log(response);
            if(!response?.data?.success){
                throw new Error("Could not fetch Category Page Data")

            }
            result=response.data.data;
            console.log(result);
            setLoading(false);
            
            toast.success("Category Page Details fetched Successfully");
            return result;

        }
        catch(err){

            console.log(err);

        }
    }

  return (
        <div>
            {
                loading?(<div className='h-[600px] w-[1200px] flex items-center justify-center text-richblack-5 text-[35px]'>Loading.....</div>):(    <div className='h-fit text-white'>

                <div className='w-[1440px] h-[244px] bg-richblack-800 py-[32px] px-[120px]'>
                    <div className='w-[870px] h-[180px]'>
                    <p className='mb-[24px] text-sm font-inter text-[14px] text-richblack-300'>{`Home/Catalog/`} <span className='text-yellow-50'>{
                            catalogPageData?.selectedCategory?.categoryName
                        }</span>
                    
                    </p>
                    <p className='mb-[24px] font-medium font-inter text-[30px] text-richblack-5'>{catalogPageData?.selectedCategory?.categoryName}</p>
                    <p className='text-sm font-inter text-[14px] text-richblack-200'>{catalogPageData?.selectedCategory?.description}</p>
                    </div>
                </div>
        
                <div>
                    {/* Section 1 */}
                    <div className='w-[1276px] h-[497px] px-[50px] py-[60px]'>
                        <div className='font-semibold font-inter text-[30px] text-richblack-5 mb-[8px]'>Courses to get you started</div>
                    <div className='mb-[8px]'>
                        <div className='flex gap-x-3'>
                        <p onClick={()=>setActive(!active)} className={`${active&&"text-yellow-100"} text-richblack-200 font-medium font-inter text-[16px]`}>
                            Most Popular
                        </p>
                        <p onClick={()=>setActive(!active)} className={`${!active&&"text-yellow-100"} text-richblack-200 font-medium font-inter text-[16px]`}>New</p>
                        </div>
                        <div className='w-[1276px] h-[1px] bg-richblack-700'></div>
                    </div>
        
                    <div >
                    <CourseSlider courses={catalogPageData?.selectedCategory?.course}/>
                    </div>
                    </div>
        
                    {/* Section 2 */}
        
                    <div className='w-[1276px] h-[497px] px-[50px] py-[60px]'>
                        <p className='font-semibold font-inter text-[30px] text-richblack-5 mb-[8px]'>Top Courses in {catalogPageData?.differentCategory?.categoryName}</p>
                        <div>
                            <CourseSlider  courses={catalogPageData?.differentCategory?.course}/>
                        </div>
        
        
                    </div>
        
                    {/* section 3 */}
        
                    <div className='w-[1276px] h-fit px-[50px] py-[60px]'>
                        <p className='font-semibold font-inter text-[30px] text-richblack-5 mb-[8px]'>Frequently Bought</p>
                        <div className='py-8'>
        
                            <div className='grid grid-cols-1 lg:grid-cols-2'>
                                {
                                    catalogPageData?.mostSellingCourses?.slice(0,4)
                                    .map((course,index)=>{
                                        return(
                                            <Course_Card course={course} key={index} />
                                        )
                                    })
                                }
                            </div>
        
                        </div>
                    </div>
        
                   
                </div>
        
                <Footer/>
                
            </div>)
            }
        </div>

  )
}
