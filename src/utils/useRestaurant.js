import { useState, useEffect } from "react";
function useRestaurant(id) {
  const [restaurant, setRestaurant] = useState(null);
  // const [menu, setMenu] = useState();
  useEffect(() => {
    const getRestaurantDetail = async () => {
      const data = await fetch(
        // "https://eat-treat-server.onrender.com/api/restaurant/menu?id="
        "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.2599333&lng=77.412615&restaurantId=" +
          id
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
