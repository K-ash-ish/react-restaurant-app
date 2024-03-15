import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartActionBtn from "./ui/CartActionBtn";
import FloatingPanel from "./ui/FloatingPanel";

function FloatingCart(props) {
  const { cartError } = props;
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
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
  );
}

export default FloatingCart;
