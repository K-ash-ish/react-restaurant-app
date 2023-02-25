import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IMG_CDN_URL } from "../constant";
function FilteredMenu({ toFilter, category }) {
  return (
    <div>
      <h1>{category}</h1>
      {toFilter.map((item) => {
        return (
          <div key={uuidv4()} className="border-2 border-red-400">
            <div className="left">
              <h2>{item.name}</h2>
              <p>{item.price.toString().slice(0, -2)}</p>
              {item.description ? <p>{item.description}</p> : null}
            </div>
            <div className="right">
              {item.cloudinaryImageId ? (
                <img
                  src={IMG_CDN_URL + item.cloudinaryImageId}
                  alt={item.mame}
                />
              ) : null}
              <button>Add</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState();
  useEffect(() => {
    const getRestaurantDetail = async () => {
      console.log("api call");
      const data = await fetch(
        "https://www.swiggy.com/dapi/menu/v4/full?lat=23.1768293&lng=79.97640129999999&menuId=" +
          id
      );
      const json = await data.json();
      setRestaurant(json.data);
    };
    getRestaurantDetail();
  }, [id]);
  const categories = ["Recommended"];
  // console.log(restaurant);
  if (restaurant) {
    Object?.values(restaurant?.menu?.items)?.forEach((item) => {
      if (categories.indexOf(item.category) === -1) {
        categories.push(item.category);
      }
    });
  }
  return restaurant ? (
    <div>
      <div className="border-2">
        <div>
          <img
            src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
            alt="restaurant-img"
          />
        </div>
        <div>
          <h1>{restaurant?.name}</h1>
          <p>{restaurant?.cuisines?.join(", ")}</p>
        </div>
        <div className=" mt-4 mb-2  flex flex-row items-center justify-around text-xs">
          <div>
            <p>{restaurant?.avgRating} ⭐</p>
            <p>{restaurant?.totalRatingsString}</p>
          </div>
          <div className="div">•</div>
          <div>
            <p>{restaurant?.sla?.slaString}</p>
            <p>Delivery time</p>
          </div>
          <div className="div">•</div>
          <div>
            <p>{restaurant?.costForTwo.toString().slice(0, -2)}</p>
            <p>{restaurant?.costForTwoMsg}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <ul className="border-2">
          {categories.map((category) => {
            return <li key={uuidv4()}>{category}</li>;
          })}
        </ul>
        <div className="border-2 border-red-400 w-1/2">
          {categories.map((category) => {
            return (
              <FilteredMenu
                key={uuidv4()}
                toFilter={Object?.values(restaurant?.menu?.items)}
                category={category}
              />
            );
          })}

          {/* {Object?.values(restaurant?.menu?.items)?.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })} */}
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
export default RestaurantPage;
