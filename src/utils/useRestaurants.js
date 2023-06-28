import { useEffect, useState, useContext } from "react";
import useCurrentLocation from "./useCurrentLocation";
import { LocationContext } from "../context/LocationContext";
import { FETCH_RESTAURANT } from "../constant";

function useRestaurants() {
  const [totalRestaurant, setTotalRestaurant] = useState(0);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filterRestaurant, setFilterRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const { coordinates, setCoordinates } = useCurrentLocation();
  const { latitude, longitude } = coordinates;
  const { location } = useContext(LocationContext);
  const getRestaurantsDetail = async () => {
    if (offset > 0) {
      const localApi = await fetch(
        `${FETCH_RESTAURANT}latitude=${location?.lat || latitude}&longitude=${
          location?.lng || longitude
        }&offset=${offset}`
      );
      const localJson = await localApi.json();
      let restaurants = localJson?.data?.cards?.map((data) => data?.data);
      setIsLoading(false);
      setAllRestaurants((prevValue) => [...prevValue, ...restaurants]);
      setFilterRestaurant((prevValue) => [...prevValue, ...restaurants]);
    } else {
      //change to render url
      const localApi = await fetch(
        `${FETCH_RESTAURANT}latitude=${location?.lat || latitude}&longitude=${
          location?.lng || longitude
        }`
        // `${FETCH_RESTAURANT}lat=${latitude}&lng=${longitude}`
      );
      const localJson = await localApi.json();
      setTotalRestaurant(
        localJson?.data?.cards[2]?.data?.data?.totalOpenRestaurants
      );
      setAllRestaurants(localJson?.data?.cards[2]?.data?.data?.cards);
      setFilterRestaurant(localJson?.data?.cards[2]?.data?.data?.cards);
    }
  };
  useEffect(() => {
    getRestaurantsDetail();
  }, [location, latitude, longitude, offset]);
  return {
    allRestaurants,
    filterRestaurant,
    setFilterRestaurant,
    setOffset,
    offset,
    totalRestaurant,
    isLoading,
    setIsLoading,
  };
}

export default useRestaurants;
