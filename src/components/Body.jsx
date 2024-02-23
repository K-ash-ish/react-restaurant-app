import ReastaurantCard from "./RestaurantCard";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cuisineCategory, FETCH_RESTAURANT } from "../constant";
import useOnline from "../hooks/useOnline";
import filterRestaurants, { filterByCuisines } from "../utils/helper";
import useRestaurants from "../hooks/useRestaurants";
import { RestaurantCardShimmer, RestaurantsShimmer } from "./Shimmer";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const observer = useRef();
  const {
    allRestaurants,
    filterRestaurant,
    setFilterRestaurant,
    totalRestaurant,
    offset,
    setOffset,
    isLoading,
    setIsLoading,
    swiggyNotPresent,
  } = useRestaurants();
  useEffect(() => {}, [swiggyNotPresent]);
  // infinite scroll
  // const lastRestaurantCard = useCallback(
  //   (node) => {
  //     if (isLoading) return;
  //     if (observer.current) observer.current.disconnect;
  //     observer.current = new IntersectionObserver((restaurants) => {
  //       if (restaurants[0].isIntersecting && offset + 15 <= totalRestaurant) {
  //         setIsLoading(true);
  //         setOffset(offset + 16);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [offset, totalRestaurant, isLoading]
  // );

  const isOnline = useOnline();
  if (!isOnline) {
    return <h1>Please Check Your Network</h1>;
  }
  if (swiggyNotPresent) {
    return (
      <div>
        No restaurant servicable Check in some other time Or change your
        location
      </div>
    );
  }
  return (
    allRestaurants?.length > 0 && (
      <div className="wrapper sm:my-0 sm:mx-auto w-full  flex flex-col ">
        <div className=" py-2  flex flex-col md:flex-row my-0 mx-auto sm:w-5/6 md:mb-4 md:my-4 border-b-2 md:items-center">
          <div className="search-box h-10   flex flex-row justify-center items-center">
            <input
              id="search-restaurant"
              type="text"
              className="border-2 px-2 py-1 h-8  text-sm focus:outline-gray-300"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              onClick={() => {
                const data = filterRestaurants(searchText, allRestaurants);
                setFilterRestaurant(data);
              }}
              className="border-2 border-red-300 hover:bg-red-500 hover:text-white hover:border-white transition-colors ease-in duration-300  text-base px-3 py-1 mx-4 "
            >
              Search
            </button>
          </div>
          <div className="flex flex-row w-5/6 flex-wrap justify-around items-center">
            {cuisineCategory.map((cuisine) => (
              <button
                key={uuidv4()}
                onClick={(e) => {
                  const data = filterByCuisines(
                    e.target.innerText,
                    allRestaurants
                  );
                  setFilterRestaurant(data);
                }}
                className="hover:border-red-500 my-1 border-2 rounded-md capitalize px-2 py-1"
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
        <div className="my-0 mx-auto  flex flex-col  sm:flex-row sm:w-5/6 w-full  sm:flex-wrap items-center justify-center  ">
          {filterRestaurant?.length === 0 ? (
            <h1>Restaurant Not found</h1>
          ) : (
            filterRestaurant?.map((restaurant, index) => {
             
              return (
                <Link key={uuidv4()} to={"/restaurant/" + restaurant?.info?.id}>
                  <ReastaurantCard {...restaurant?.info} />
                </Link>
              );
             
            })
          )}
          {isLoading && <RestaurantCardShimmer />}
        </div>
      </div>
    )
  );
};
export default Body;
