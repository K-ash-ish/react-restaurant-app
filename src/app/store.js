import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import restaurantReducer from "../features/restaurant/restaurantSlice";
import orderReducer from "../features/order/orderSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    restaurantInfo: restaurantReducer,
    orderInfo: orderReducer,
  },
});
