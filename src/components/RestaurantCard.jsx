import { IMG_CDN_URL } from "../constant";
function ReastaurantCard(props) {
  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRating,
    costForTwoString,
    slaString,
  } = props;
  return (
    <div className="card w-full  p-4 m-3  flex  sm:flex-col  items-center justify-around hover:border-2 cursor-pointer">
      <div className=" restaurant-img sm:w-full  w-1/4 h-24 flex items-center">
        <img
          className="rounded-xl sm:rounded-none "
          src={IMG_CDN_URL + cloudinaryImageId}
          alt={name + "restaurant"}
        />
      </div>
      <div className="card-details  sm:w-full w-3/5">
        <h1 className="font-bold my-1">{name}</h1>
        <div className="cuisines  text-xs flex flex-wrap">
          <p>{cuisines.join(", ")}</p>
        </div>
        <div className=" mt-4 mb-2  flex flex-row items-center justify-around text-xs">
          <div>{avgRating} ⭐</div>
          <div className="div">•</div>
          <div>{slaString}</div>
          <div className="div">•</div>
          <div>{costForTwoString}</div>
        </div>
      </div>
    </div>
  );
}

export default ReastaurantCard;
