import { IMG_CDN_URL } from "../constant";
function ReastaurantCard(props) {
  const { name, cuisines, cloudinaryImageId, avgRating, costForTwo, sla } =
    props;
  return (
    <div className="card   p-4 m-3  flex  md:flex-col  items-center justify-around hover:shadow-lg hover:rounded-md cursor-pointer">
      <div className=" restaurant-img md:w-full  w-1/4 h-24 flex items-center">
        <img
          className="rounded-xl md:rounded-none "
          src={IMG_CDN_URL + cloudinaryImageId}
          alt={name + "restaurant"}
        />
      </div>
      <div className="card-details  md:w-full w-3/5">
        <h1 className="font-bold my-1">
          {name?.length > 20 ? name?.substring(0, 20) + "..." : name}
        </h1>
        <div className="cuisines  text-xs flex flex-wrap">
          <p>{cuisines?.join(", ")}</p>
        </div>
        <div className=" mt-4 mb-2  flex flex-row items-center justify-around text-xs">
          <div>{avgRating} ⭐</div>
          <div className="div">•</div>
          <div>{sla?.slaString}</div>
          <div className="div">•</div>
          <div>{costForTwo}</div>
        </div>
      </div>
    </div>
  );
}

export default ReastaurantCard;
