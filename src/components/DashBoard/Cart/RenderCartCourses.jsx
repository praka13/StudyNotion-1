import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeCart } from '../../../slices/cartSlice';
import ReactStars from "react-rating-stars-component"

export const RenderCartCourses = () => {

    const {cart}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();
  return (
    <div>
        {
            cart.map((course,index)=>{
                return(
                    <div>
                        <div>
                            <img src={course?.thumbNail}/>
                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course?.catgory?.categoryName}</p>
                                <div>
                                    <span>4.8</span>
                                    <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<GiNinjaStar/>}
                                    fullIcon={<GiNinjaStar/>}

                                    />
                                    <span>{course?.ratingAndReviews?.length}</span>


                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                            onClick={()=>dispatch(removeCart(course._id))}
                            >
                                <RiDeleteBin5Line/>
                                <span>Remove</span>
                            </button>

                            <p>Rs {course?.price}</p>
                        </div>
                    </div>
                )
            })
        }

    </div>
  )
}
