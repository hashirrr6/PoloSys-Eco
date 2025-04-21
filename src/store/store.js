import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../features/cartSlice.js"
import WishReducer from "../features/wishSlice.js"
// import UserReducer from "../features/userSlice.js"


export const Store=configureStore({
    reducer:{
        cart:CartReducer,
        wishlist:WishReducer,
        // userprofile:UserReducer,

    }
});
export default Store;