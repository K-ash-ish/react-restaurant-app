import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, repeatItem, updateCart } from "../features/cart/cartSlice";
import { NavLink } from "react-router-dom";

function MobileCart(props) {
  const { setShowCart } = props;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  return (
    <div className="px-2 flex flex-col gap-2">
      <h1 className="font-semibold">Cart Items</h1>

      {cartItems.map((item, index) => (
        <div key={index}>
          <ul className="flex flex-row justify-between items-center gap-4">
            <li className="text-sm underline">
              {item.dishName?.substring(0, 25) + "..."}
            </li>
            <li className="font-semibold text-red-500 border-2 flex flex-row  gap-4 px-2 items-center justify-between border-black min-w-16">
              <button
                className="font-semibold "
                onClick={() => {
                  dispatch(removeItem(item.dishName));
                  if (item.quantity === 1) {
                    // if quantity was 1 then after removing it should be 0 so updating the cart
                    dispatch(updateCart());
                  }
                  if (item.quantity === 0) setShowCart(false);
                }}
              >
                -
              </button>
              <p>{item.quantity} </p>
              <button
                className="font-semibold"
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
      <NavLink
        to="/cart"
        className="border-b-2 rounded-md my-2 py-1 text-orange-500 no-underline text-center"
      >
        Checkout
      </NavLink>
    </div>
  );
}

export default MobileCart;
