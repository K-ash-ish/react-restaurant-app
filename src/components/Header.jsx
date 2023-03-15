import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  return (
    <nav className="flex flex-col md:flex-row md:justify-around w-full items-center justify-around my-2 py-1 md:border-b-2 h-20">
      {" "}
      <NavLink to="/">
        <h1 className="text-3xl tracking-wider font-bold my-4">
          Eat<span className="text-rose-500 tracking-wider">Treat</span>
        </h1>
      </NavLink>
      <ul className="flex flex-row justify-evenly items-center text-lg  w-full md:w-1/2 h-14 ">

        <NavLink to="/cart">
          <li className="nav-item ">
            Cart{" "}
            <span className="underline decoration-red-500 underline-offset-2 text-base font-bold">
              {totalItems > 0 ? totalItems : null}
            </span>
          </li>
        </NavLink>
        <NavLink to="/login">
          <li className="nav-item ">Login</li>
        </NavLink>
      </ul>
    </nav>
  );
}
export default Header;
