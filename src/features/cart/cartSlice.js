import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.cartItems++;
    },
  },
});
