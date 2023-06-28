import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useFirebase } from "../context/Firebase";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import LocationSearch from "./LocationSearch";
import { useState } from "react";
import useGetCity from "../utils/useGetCity";
function Header() {
  const [manualLocation, setManualLocation] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const firebase = useFirebase();
  const totalItems = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );
  const cityName = useGetCity();
  console.log(cityName);
  return (
    <nav className="flex flex-col md:flex-row md:justify-around w-full items-center justify-around my-2 py-1 md:border-b-2 h-20">
      {" "}
      <NavLink to="/">
        <h1 className="text-3xl tracking-wider font-bold my-4">
          Eat<span className="text-rose-500 tracking-wider">Treat</span>
        </h1>
      </NavLink>
      <ul className="flex flex-row justify-evenly items-center text-lg  w-full md:w-1/2 h-14 ">
        <li>
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-orange-500 px-4"
          />
          {cityName || "***"}
        </li>
        <li className="nav-item " onClick={() => setManualLocation(true)}>
          Location
        </li>
        <NavLink to="/cart">
          <li className="nav-item ">
            Cart{" "}
            <span className="underline decoration-red-500 underline-offset-2 text-base font-bold">
              {totalItems > 0 ? (
                totalItems
              ) : (
                <FontAwesomeIcon icon={faShoppingCart} />
              )}
            </span>
          </li>
        </NavLink>
        {firebase.user ? (
          <div>
            <FontAwesomeIcon className="mx-2" icon={faUser} />{" "}
            <button
              onClick={firebase.logOut}
              className="border-2 border-red-300 w-20 h-10 my-6 capitalize cursor-pointer hover:text-white hover:bg-red-500 hover:border-none transition-colors ease-in duration-300 "
            >
              LogOut
            </button>{" "}
          </div>
        ) : (
          <NavLink to="/login">
            <li className="nav-item ">Login</li>
          </NavLink>
        )}
      </ul>
      {manualLocation && (
        <LocationSearch
          setManualLocation={setManualLocation}
          manualLocation={manualLocation}
        />
      )}
    </nav>
  );
}
export default Header;
