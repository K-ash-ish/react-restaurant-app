import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faLocationDot,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useFirebase } from "../../context/Firebase";
import LocationSearch from "../LocationSearch";
import { useState } from "react";
import useGetCity from "../../hooks/useGetCity";
import DropDownMenu from "../ui/DropDownMenu";
function Header() {
  const [manualLocation, setManualLocation] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const firebase = useFirebase();
  const totalItems = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );
  const cityName = useGetCity();
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
            <span className=" text-base font-bold">
              {totalItems > 0 ? (
                totalItems
              ) : (
                <FontAwesomeIcon icon={faShoppingCart} />
              )}
            </span>
          </li>
        </NavLink>
        {firebase.user ? (
          <div className="flex items-center gap-2 relative ">
            <DropDownMenu isOpen={showDropDown} setIsOpen={setShowDropDown}>
              <li className="hover:bg-gray-100 py-2 px-2 rounded-md cursor-pointer">
                <a href="/">Orders</a>
              </li>

              <li className="hover:bg-gray-100 py-2 px-2 rounded-md text-red-500 cursor-pointer">
                <button
                  onClick={firebase.logOut}
                  className="  cursor-pointer  "
                >
                  Logout
                </button>
              </li>
            </DropDownMenu>
            <button
              className="cursor-pointer"
              onClick={() => setShowDropDown(!showDropDown)}
            >
              <FontAwesomeIcon className="" icon={faUserAlt} />
            </button>
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
