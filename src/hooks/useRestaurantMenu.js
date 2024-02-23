import { useState, useEffect, useContext } from "react";
import { FETCH_MENU } from "../constant";
import useCurrentLocation from "./useCurrentLocation";
import { LocationContext } from "../context/LocationContext";

function useRestaurantMenu(id) {
  const [restaurant, setRestaurant] = useState(null);
  const { coordinates, setCoordinates } = useCurrentLocation();
  const { latitude, longitude } = coordinates;
  const { location } = useContext(LocationContext);
  function getResAndMenuInfo(json) {
    const restaurantInfo = json?.data?.cards
      ?.map((x) => x.card)
      ?.filter(
        (x) =>
          x?.card["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
      )[0]?.card?.info;
    const restaurantMenu = json?.data?.cards
      ?.find((x) => x.hasOwnProperty("groupedCard"))
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x?.card?.card)
      ?.filter(
        (x) =>
          x["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      )
      ?.map((x) => x);
    return { restaurantInfo, restaurantMenu };
  }

  const getRestaurantMenu = async () => {
    const data = await fetch(
      `${FETCH_MENU}id=${id}&longitude=${location?.lng || longitude}&latitude=${
        location?.lat || latitude
      }`
    );
    // const data = await fetch(
    //   `${FETCH_MENU}&lat=${location?.lat || latitude}&lng=${
    //     location?.lng || longitude
    //   }&restaurantId=${id}&submitAction=ENTER`
    // );
    const json = await data.json();
    const { restaurantInfo, restaurantMenu } = getResAndMenuInfo(json);

    if (restaurantInfo && restaurantMenu) {
      setRestaurant({ restaurantInfo, restaurantMenu });
    }
    // const restaurantdetails = restaurantPage;
    // setRestaurant(restaurantdetails.data);
  };
  useEffect(() => {
    getRestaurantMenu();
  }, [id, latitude, longitude]);
  return restaurant;
}
export default useRestaurantMenu;
