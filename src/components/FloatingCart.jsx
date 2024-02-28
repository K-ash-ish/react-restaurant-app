import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartActionBtn from "./ui/CartActionBtn";

function FloatingCart(props) {
  const { cartError, showCart, setShowCart } = props;
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <div
        className={`  fixed bottom-24 left-0 right-0  bg-gray-50  w-80 max-h-[200px] overflow-y-scroll px-2 py-1 mx-auto  rounded-xl shadow-md border-2  border-red-200   
               transition-all ease-in-out duration-700 ${
                 showCart
                   ? "translate-y-0"
                   : "translate-y-20 opacity-0 pointer-events-none border-none "
               }`}
      >
        <div className="px-2 flex flex-col gap-2">
          <h1 className="font-semibold">Cart Items</h1>

          {cartItems.map((item, index) => (
            <div key={index}>
              <ul className="flex flex-row justify-between items-center gap-4">
                <li className="text-sm underline">
                  {item.dishName?.substring(0, 25) + "..."}
                </li>

                <CartActionBtn
                  itemName={item?.dishName}
                  quantity={item?.quantity}
                />
              </ul>
            </div>
          ))}
          {cartError && (
            <p className="text-xs pt-2 text-red-500">
              Your cart contains items from other restaurant.
            </p>
          )}
          <NavLink
            to="/cart"
            className="border-b-2 rounded-md my-2 py-1 text-orange-500 no-underline text-center"
          >
            Checkout
          </NavLink>
        </div>
      </div>
      <button
        className=" bg-gray-50  w-40 mx-auto fixed bottom-10 left-0 right-0 border-2 border-red-300 rounded-md px-1 py-2 "
        onClick={() => setShowCart(!showCart)}
      >
        Cart
        <span className="text-red-500 font-semibold ml-2">
          {cartItems.length}
        </span>
      </button>
    </>
  );
}

export default FloatingCart;
