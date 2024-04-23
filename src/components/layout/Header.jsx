import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faLocationDot,
  faUserAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useFirebase } from "../../context/Firebase";
import LocationSearch from "../LocationSearch";
import { useEffect, useState } from "react";
import useGetCityName from "../../hooks/useGetCityName";
import DropDownMenu from "../ui/DropDownMenu";
function Header() {
  const [manualLocation, setManualLocation] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const firebase = useFirebase();
  const totalItems = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );
  const cityName = useGetCityName();
  useEffect(() => {
    (async () => {
      try {
        const user = await firebase?.user;
        if (user) {
          setIsloggedIn(true);
        } else if (user === undefined) {
          setIsloggedIn(false);
        }
      } catch (error) {
        console.error("Error in auth", error);
      }
    })();
  }, [firebase?.user]);
  return (
    <nav className="flex flex-col md:flex-row md:justify-around w-full items-center justify-around my-2 py-1 md:border-b-2 min-h-20">
      <NavLink to="/">
        <h1 className="text-3xl tracking-wider font-bold my-4">
          Eat<span className="text-rose-500 tracking-wider">Treat</span>
        </h1>
      </NavLink>
      <ul className="flex flex-row justify-evenly items-center text-lg  w-full md:w-1/2 h-14 ">
        <li className="flex items-center ">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-orange-500 px-4"
          />
          <div>
            {cityName?.length > 12
              ? cityName.substring(0, 12) + "..."
              : cityName || (
                  <div className="w-16 h-4 bg-slate-200 animate-pulse"></div>
                )}
          </div>
        </li>
        <li className="nav-item " onClick={() => setManualLocation(true)}>
          Location
        </li>
        <NavLink to="/cart">
          <li className="nav-item ">
            Cart
            <span className=" text-base font-bold">
              {totalItems > 0 ? (
                totalItems
              ) : (
                <FontAwesomeIcon icon={faShoppingCart} />
              )}
            </span>
          </li>
        </NavLink>

        <>
          {isLoggedIn !== undefined ? (
            isLoggedIn ? (
              <div className="flex items-center gap-2 relative ">
                <DropDownMenu isOpen={showDropDown} setIsOpen={setShowDropDown}>
                  <NavLink to="/orders" onClick={() => setShowDropDown(false)}>
                    <li className="hover:bg-gray-100 py-2 px-2 rounded-md cursor-pointer">
                      Orders
                    </li>
                  </NavLink>

                  <button
                    onClick={() => {
                      firebase.logOut();
                      setIsloggedIn(false);
                      setShowDropDown(false);
                    }}
                    className="hover:bg-gray-100 py-2 px-2 text-left rounded-md text-red-500 cursor-pointer"
                  >
                    Logout
                  </button>
                </DropDownMenu>
                <button
                  className="cursor-pointer flex items-end gap-1 hover:bg-gray-200 hover:rounded-full transition-all duration-500 p-2 "
                  onClick={() => setShowDropDown(!showDropDown)}
                >
                  <FontAwesomeIcon className="" icon={faUserAlt} />
                  <FontAwesomeIcon icon={faChevronDown} className="text-xs " />
                </button>
              </div>
            ) : (
              <NavLink to="/login">
                <li className="nav-item ">Login</li>
              </NavLink>
            )
          ) : (
            <div className="w-12 h-6 rounded-full bg-slate-200 animate-pulse"></div>
          )}
        </>
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
