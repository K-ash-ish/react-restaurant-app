import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../index.css";
import { IMG_CDN_URL } from "../constant";
import Cart from "./Cart";
import useRestaurant from "../utils/useRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../features/cart/cartSlice";

function FilteredMenu({ toFilter, category, handleClick }) {
  return (
    <div className=" flex flex-col ">
      <h1 className="font-medium text-xl underline decoration-red-500 underline-offset-4 my-4 md:my-0">
        {category}
      </h1>
      {toFilter.map((item) => {
        return (
          <div
            key={uuidv4()}
            className="flex md:justify-between  md:my-4 border-b-2 md:pb-3"
          >
            <div className=" w-2/3 flex flex-col  justify-center">
              <h2 className="font-medium text-lg">{item.name}</h2>
              <p className="my-2">
                <span className="text-green-500">₹</span>
                {item.price.toString().slice(0, -2)}
              </p>
              {item.description ? (
                <p className="font-thin text-xs my-2 w-3/5">
                  {item.description}
                </p>
              ) : null}
            </div>
            <div className=" px-2 flex md:flex-row flex-wrap flex-col justify-around  md:justify-between  items-center w-1/3  h-36">
              {item.cloudinaryImageId ? (
                <img
                  src={IMG_CDN_URL + item.cloudinaryImageId}
                  alt={item.name}
                  className="md:w-32 w-28 rounded-lg y-0 mx-auto"
                />
              ) : (
                <div></div>
              )}
              <button
                onClick={(e) => {
                  console.log(item.name);
                  const dishName = item.name;
                  const dishPrice = item.price.toString().slice(0, -2);
                  handleClick({ dishName, dishPrice });
                }}
                className="my-0 mx-auto border-2  h-10  px-4 hover:shadow-md"
              >
                Add
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function RestaurantPage() {
  const { id } = useParams();
  const restaurant = useRestaurant(id);
  const categories = ["Recommended"];
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);
  function handleClick(item) {
    console.log("added items to cart");
    dispatch(addItems(item));
  }
  if (restaurant) {
    Object?.values(restaurant?.menu?.items)?.forEach((item) => {
      if (categories.indexOf(item.category) === -1) {
        categories.push(item.category);
      }
    });
  }
  return restaurant ? (
    <div className=" capitalize w-full md: flex flex-col  items-center">
      <div className=" my-5 text-white restaurant-banner w-full flex md:justify-start justify-center items-center ">
        <div className=" md:ml-48 hidden md:block">
          <img
            className="w-72"
            src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
            alt="restaurant-img"
          />
        </div>
        <div className="md:ml-24 md:h-52 md:w-72 w-full flex justify-around items-center  md:flex-col md:justify-center ">
          <div className="md:border-b-2  md:border-red-500 md:pb-2 md:px-2">
            <h1 className="text-2xl">{restaurant?.name}</h1>
            <p className="font-thin text-lg">
              {restaurant?.cuisines?.join(", ")}
            </p>
          </div>
          <div className=" mt-4 mb-2  flex flex-row items-center justify-around text-xs">
            <div className="">
              <p className="font-semibold text-lg my-1">
                {restaurant?.avgRating} ⭐
              </p>
              <p>{restaurant?.totalRatingsString}</p>
            </div>
            <div className="hidden md:block md:text-xl px-2">•</div>
            <div className="hidden md:flex flex-col">
              <p className="font-semibold text-lg my-1">
                {restaurant?.sla?.slaString}
              </p>
              <p>Delivery time</p>
            </div>
            <div className="hidden md:block md:text-xl px-2">•</div>
            <div className="hidden md:flex flex-col">
              <p className="font-semibold text-lg my-1">
                <span className="text-green-500">₹</span>
                {restaurant?.costForTwo.toString().slice(0, -2)}
              </p>
              <p>cost for two</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex md:flex-row flex-col  md:justify-evenly">
        <ul className="md:border-r-2  border-b-2 md:border-b-0  pr-4 md:w-1/5 py-2 h-1/2 my-2 flex flex-row  items-center md:flex-col md:items-end ">
          {categories.map((category) => {
            return (
              <li
                className="px-3 category text-sm  font-medium cursor-pointer my-3 "
                key={uuidv4()}
              >
                {category}
              </li>
            );
          })}
        </ul>
        <div className=" my-2 px-4  w-full md:w-5/12  md:mx-2  flex flex-col">
          {categories.map((category) => {
            return (
              <FilteredMenu
                key={uuidv4()}
                toFilter={Object?.values(restaurant?.menu?.items)}
                category={category}
                handleClick={handleClick}
              />
            );
          })}

          {/* {Object?.values(restaurant?.menu?.items)?.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })} */}
        </div>
        <Cart />
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
export default RestaurantPage;
