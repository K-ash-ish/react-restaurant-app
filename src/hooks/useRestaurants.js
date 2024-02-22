import { useEffect, useState, useContext } from "react";
import useCurrentLocation from "./useCurrentLocation";
import { LocationContext } from "../context/LocationContext";
import { FETCH_RESTAURANT } from "../constant";

function useRestaurants() {
  const [totalRestaurant, setTotalRestaurant] = useState(0);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filterRestaurant, setFilterRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [swiggyNotPresent, setSwiggyNotPresent] = useState(false);
  const [offset, setOffset] = useState(0);
  const { coordinates, setCoordinates } = useCurrentLocation();
  const { latitude, longitude } = coordinates;
  const { location } = useContext(LocationContext);
  function checkResData(json) {
    let restaurantData, restaurantCount;
    for (let i = 0; i < json?.data?.cards?.length; i++) {
      // initialize checkData for Swiggy Restaurant data
      if (
        json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      ) {
        restaurantData =
          json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;
      }
      if (json?.data?.cards[i]?.card?.card?.restaurantCount) {
        restaurantCount = json?.data?.cards[i]?.card?.card?.restaurantCount;
      }
      if (restaurantData && restaurantCount) {
        break;
      }
    }
    if (json?.data?.communication?.swiggyNotPresent) {
      setSwiggyNotPresent(true);
    }
    return { restaurantData, restaurantCount };
    // if restaurantDatais not undefined then return it
  }
  const getRestaurantsDetail = async () => {
    //change to render url
    const localApi = await fetch(
      `${FETCH_RESTAURANT}latitude=${location?.lat || latitude}&longitude=${
        location?.lng || longitude
      }`
      // `${FETCH_RESTAURANT}lat=${location?.lat || latitude}&lng=${
      //   location?.lng || longitude
      // }`
    );

    const localJson = await localApi.json();
    const { restaurantData, restaurantCount } = checkResData(localJson);
    setTotalRestaurant(restaurantCount);
    setAllRestaurants(restaurantData);
    setFilterRestaurant(restaurantData);
  };
  useEffect(() => {
    offset > 0 &&
      (async () => {
        const localApi = await fetch(
          `${FETCH_RESTAURANT}latitude=${location?.lat || latitude}&longitude=${
            location?.lng || longitude
          }&offset=${offset}`
        );
        const localJson = await localApi.json();
        const { restaurantData } = checkResData(localJson);
        setIsLoading(false);
        setAllRestaurants((prevValue) => [...prevValue, ...restaurantData]);
        setFilterRestaurant((prevValue) => [...prevValue, ...restaurantData]);
      })();
  }, [offset]);

  useEffect(() => {
    setAllRestaurants([]);
    setFilterRestaurant([]);
    setTotalRestaurant(0);
    setOffset(0);
    getRestaurantsDetail();
  }, [location, latitude, longitude]);
  return {
    allRestaurants,
    filterRestaurant,
    setFilterRestaurant,
    setOffset,
    offset,
    totalRestaurant,
    isLoading,
    setIsLoading,
    setAllRestaurants,
    swiggyNotPresent,
  };
}

export default useRestaurants;
