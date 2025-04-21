import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromStorage = () => {
  try {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Failed to load wishlist from localStorage", err);
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlistFromStorage(),
  reducers: {
    toggleWishlist: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
      
      localStorage.setItem("wishlist", JSON.stringify(state));
    },
    
    removeFromWishlist: (state, action) => {
      const newState = state.filter(item => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(newState));
      return newState;
    },
    
    clearWishlist: () => {
      localStorage.removeItem("wishlist");
      return [];
    }
  }
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export const selectWishlistItems = state => state.wishlist;
export const selectWishlistCount = state => state.wishlist.length;
export const selectIsInWishlist = (state, productId) => 
  state.wishlist.some(item => item.id === productId);

export default wishlistSlice.reducer;