import { useEffect, useState, useContext } from "react";
import useCurrentLocation from "./useCurrentLocation";
import { LocationContext } from "../context/LocationContext";
import { FETCH_RESTAURANT } from "../constant";

function useRestaurants() {
  const [totalRestaurant, setTotalRestaurant] = useState(0);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filterRestaurant, setFilterRestaurant] = useState([]);
  const [offset, setOffset] = useState(15);
  const { coordinates, setCoordinates } = useCurrentLocation();
  const { latitude, longitude } = coordinates;
  const { location } = useContext(LocationContext);
  const getRestaurantsDetail = async () => {
    //change to render url
    const localApi = await fetch(
      `${FETCH_RESTAURANT}latitude=${location?.lat || latitude}&longitude=${
        location?.lng || longitude
      }`
      // `${FETCH_RESTAURANT}lat=${latitude}&lng=${longitude}`
    );
    const localJson = await localApi.json();
    setTotalRestaurant(localJson?.data?.totalSize);
    setAllRestaurants(localJson?.data?.cards);
    setFilterRestaurant(localJson?.data?.cards);
  };
  useEffect(() => {
    getRestaurantsDetail();
  }, [location, latitude, longitude]);
  return {
    allRestaurants,
    filterRestaurant,
    setFilterRestaurant,
    setOffset,
    totalRestaurant,
  };
}

export default useRestaurants;
