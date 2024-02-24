import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import restaurantReducer from "../features/restaurant/restaurantSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    restaurantInfo: restaurantReducer,
  },
});
