import React from 'react'
import { useSelector } from 'react-redux'

export const RenderTotalAmount = () => {

    const {total,cart}=useSelector((state)=>state.cart);
    const handleBuyCourse=()=>{

        const courses=cart.map((course)=>course._id);

        console.log("Bought these courses",courses);

    }
  return (
    <div>
        <p>Total:</p>
        <p>Rs {total}</p>
        <button onClick={handleBuyCourse} className="w-full justify-center">
            Buy Now
        </button>
    </div>
  )
}
