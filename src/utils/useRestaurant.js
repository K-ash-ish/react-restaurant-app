import { useState, useEffect } from "react";
import { FETCH_MENU } from "../constant";
function useRestaurant(id) {
  const [restaurant, setRestaurant] = useState(null);
  // const [menu, setMenu] = useState();
  useEffect(() => {
    const getRestaurantDetail = async () => {
      const data = await fetch(
        // "https://eat-treat-server.onrender.com/api/restaurant/menu?id="
        FETCH_MENU + id
      );
      // const data = await fetch(
      //   "http://localhost:4000/api/restaurant/menu?id=" + id
      // );
      const json = await data.json();
      setRestaurant(json.data);
    };
    getRestaurantDetail();
  }, [id]);
  return restaurant;
}
export default useRestaurant;
