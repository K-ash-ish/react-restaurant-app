import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.cartItems.push(action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});
export default cartSlice.reducer;
export const { addItems, clearCart } = cartSlice.actions;
