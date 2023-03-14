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
      <ul className="flex flex-row justify-around items-center text-lg  w-full md:w-1/3 h-14 ">
        <div className="search-box h-10 w-1/2   flex flex-row justify-center items-center">
          <input
            type="text"
            className="border-2 px-2 py-1 h-8 w-5/6 text-sm focus:outline-gray-300"
          />
          <button className="border-2 border-red-300 hover:bg-red-500 hover:text-white hover:border-white transition-colors ease-in duration-300  text-base px-3 py-1 mx-2 ">
            Search
          </button>
        </div>
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
