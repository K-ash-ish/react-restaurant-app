import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../index.css";
import { IMG_CDN_URL, restaurantPage } from "../constant";
import Cart from "./Cart";
import useRestaurant from "../utils/useRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { addItems, repeatItem } from "../features/cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

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
              <h2 className="font-medium text-lg">{item?.card?.info?.name}</h2>
              <p className="my-2">
                <span className="text-green-500">₹</span>
                {item?.card?.info?.price?.toString()?.slice(0, -2)}
              </p>
              {item?.card?.info?.description ? (
                <p className="font-thin text-xs my-2 w-3/5">
                  {item?.card?.info?.description}
                </p>
              ) : null}
            </div>
            <div className=" px-2 flex md:flex-row flex-wrap flex-col justify-around  md:justify-between  items-center w-1/3  h-36">
              {item?.card?.info?.imageId ? (
                <img
                  src={IMG_CDN_URL + item?.card?.info?.imageId}
                  alt={item?.card?.info?.name}
                  className="md:w-32 w-28 rounded-lg y-0 mx-auto"
                />
              ) : (
                <div></div>
              )}
              <button
                onClick={(e) => {
                  const dishName = item?.card?.info?.name;
                  const dishPrice = item?.card?.info?.price
                    ?.toString()
                    ?.slice(0, -2);
                  const quantity = 1;
                  handleClick({ dishName, dishPrice, quantity });
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
function currentRestaurant() {
  return (
    <h1 className="capitalize">Something wrong with Restaurant searched.</h1>
  );
}
function RestaurantPage() {
  const { id } = useParams();
  let restaurant = useRestaurant(id);
  // let restaurant = restaurantPage.data;
  console.log(restaurant);
  const categories = ["Recommended"];
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  function repeatItems(dishName) {
    dispatch(repeatItem(dishName));
  }

  function handleClick(addItem) {
    const isPresent = cartItems.filter((item) => {
      return item.dishName === addItem.dishName;
    });
    if (isPresent.length === 0) {
      dispatch(addItems(addItem));
    } else {
      repeatItems(addItem.dishName);
    }
  }

  let restaurantInfo = restaurant?.cards[0].card?.card?.info;

  let restaurantItem =
    restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards;
  let somethingWrong = 0;
  if (restaurantItem === undefined) {
    restaurantItem =
      restaurantPage?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR
        ?.cards[1]?.card?.card?.itemCards;
    restaurantInfo = restaurantPage.data.cards[0].card.card.info;
    somethingWrong++;
  }
  if (restaurantItem) {
    Object?.values(restaurantItem)?.forEach((item) => {
      if (categories.indexOf(item.card.info.category) === -1) {
        categories.push(item.card.info.category);
      }
    });
  }
  // if (restaurantItem) {
  //   return <h1>Somethin Went wrong Check another restaurant</h1>;
  // }
  return restaurant ? (
    <div className=" capitalize w-full md: flex flex-col  items-center">
      {somethingWrong > 0 ? currentRestaurant() : null}
      <div className=" my-5 text-white restaurant-banner w-full flex md:justify-start justify-center items-center ">
        <div className=" md:ml-48 hidden md:block">
          <img
            className="w-72"
            src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId}
            alt="restaurant-img"
          />
        </div>
        <div className="md:ml-24 md:h-52 md:w-72 w-full flex justify-around items-center  md:flex-col md:justify-center ">
          <div className="md:border-b-2  md:border-red-500 md:pb-2 md:px-2">
            <h1 className="text-2xl">{restaurantInfo?.name}</h1>
            <p className="font-thin text-lg">
              {restaurantInfo?.cuisines?.join(", ")}
            </p>
          </div>
          <div className=" mt-4 mb-2  flex flex-row items-center justify-around text-xs">
            <div className="">
              <p className="font-semibold text-lg my-1">
                {restaurantInfo?.avgRating || "--"} ⭐
              </p>
              <p>{restaurantInfo?.totalRatingsString}</p>
            </div>
            <div className="hidden md:block md:text-xl px-2">•</div>
            <div className="hidden md:flex flex-col">
              <p className="font-semibold text-lg my-1">
                {restaurantInfo?.sla?.slaString}
              </p>
              <p>Delivery time</p>
            </div>
            <div className="hidden md:block md:text-xl px-2">•</div>
            <div className="hidden md:flex flex-col">
              <p className="font-semibold text-lg my-1">
                <span className="text-green-500">₹</span>
                {restaurantInfo?.costForTwo.toString().slice(0, -2)}
              </p>
              <p>cost for two</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex md:flex-row flex-col  md:justify-evenly">
        <ul className="md:border-r-2  border-b-2 md:border-b-0  pr-4 md:w-1/5 py-2 h-1/2 my-2 flex flex-row flex-wrap  items-center md:flex-col  md:items-end ">
          {categories.map((category) => {
            return (
              <li
                className=" underline   py-1 mx-2 category text-sm md:text-right font-medium cursor-pointer my-3 "
                key={uuidv4()}
              >
                {category}
              </li>
            );
          })}
        </ul>
        <div className="menu my-2 px-4  w-full md:w-5/12  md:mx-2  flex flex-col  md:overflow-auto md:h-[700px]">
          {categories.map((category) => {
            return (
              <FilteredMenu
                key={uuidv4()}
                toFilter={restaurantItem}
                category={category}
                handleClick={handleClick}
              />
            );
          })}
        </div>
        <Cart />
      </div>
      <ul className="fixed bottom-28 hidden border-2 z-50">
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
      </ul>
      <button className="md:hidden fixed top-[85%] border-2 rounded-md px-2 py-1 border-red-300">
        <FontAwesomeIcon
          className="md:hidden text-base mr-2 "
          icon={faUtensils}
        />
        Browse Menu
      </button>
      <button className="md:hidden fixed top-[93%] border-2 rounded-md px-2 py-1 border-red-300">
        Cart
      </button>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
export default RestaurantPage;
