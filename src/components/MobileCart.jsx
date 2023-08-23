import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, repeatItem, updateCart } from "../features/cart/cartSlice";

function MobileCart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  return (
    <div className="px-2 flex flex-col gap-2">
      <h1 className="font-semibold">Cart Items</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
          <ul className="flex flex-row  justify-between  items-center">
            <li>{item.dishName}</li>
            <li className="font-semibold text-red-500 border-2 flex flex-row  gap-2 justify-between border-black min-w-16">
              <button
                className="font-semibold  px-1"
                onClick={() => {
                  dispatch(removeItem(item.dishName));
                  if (item.quantity === 1) {
                    // if quantity was 1 then after removing it should be 0 so updating the cart
                    dispatch(updateCart());
                  }
                }}
              >
                -
              </button>{" "}
              {item.quantity}{" "}
              <button
                className="font-semibold  px-1"
                onClick={() => {
                  dispatch(repeatItem(item.dishName));
                }}
              >
                +
              </button>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MobileCart;