import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState={
   totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
   cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
   total:localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")):0,

}

const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
 
        addToCart(state,action){
            const course=action.payload;
            const index=state.cart.findIndex((item)=>item._id===course._id);

            if(index>=0){
                toast.error("course already in cart")
                return
            }

            state.cart.push(course);
            state.totalItems++;
            state.total+=course.price;

            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            // show toast
            toast.success("Course added to cart")
        },
        removeCart(state,action){

            const course=action.payload;
            const index=state.cart.findIndex((item)=>item._id===course._id);

            if(index>=0){
                state.totalItems--;
                state.total-=state.cart[index].price;
                state.cart.splice(index,1);
            }

            localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        // show toast
        toast.success("Course removed from cart")
      },

      resetCart(state,action){
        state.total=0
        state.totalItems=0
        state.cart=[]

        localStorage.removeItem("cart")
        localStorage.removeItem("total")
        localStorage.removeItem("totalItems")
    }

    }
})

export const {addToCart,removeCart,resetCart}=cartSlice.actions;
export default cartSlice.reducer;