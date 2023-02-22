import ReastaurantCard from "./RestaurantCard";
import restaurantList from "../constant";
const Body = () => {
  return (
    <div className="container w-full border-2 flex h-5/6">
      <h1>Order From</h1>
      {restaurantList.map((restaurant) => {
        return <ReastaurantCard {...restaurant.data} />;
      })}
    </div>
  );
};
export default Body;
