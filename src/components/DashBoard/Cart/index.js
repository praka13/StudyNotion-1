import React from 'react'
import { useSelector } from 'react-redux';
import { RenderCartCourses } from './RenderCartCourses';
import { RenderTotalAmount } from './RenderTotalAmount';

export const Cart = () => {

    const {total,totalItems}=useSelector((state)=>state.cart)
  return (
    <div>
        <div>Your Cart</div>
        <p>{totalItems} courses in cart</p>

        {total>0?
        (
            <div>
                <RenderCartCourses/>
        <RenderTotalAmount/>
            </div>
        ):(<p>Your Cart is empty</p>)}
    </div>
  )
}
