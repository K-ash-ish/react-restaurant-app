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
    <div className="card border-2 p-2 m-3  flex flex-col">
      <img src={IMG_CDN_URL + cloudinaryImageId} alt={name + "restaurant"} />
      <h1 className="font-bold my-1">{name}</h1>
      <div className="cuisines  text-xs flex flex-wrap">
        <p>{cuisines.join(", ")}</p>
      </div>
      <div className="order-b-2 ratings mt-4 mb-2  flex flex-row items-center justify-around text-sm">
        <div>{avgRating}⭐</div>
        <div className="div">•</div>
        <div>{slaString}</div>
        <div className="div">•</div>
        <div>{costForTwoString}</div>
      </div>
      <div className="border-t-2"></div>
    </div>
  );
}

export default ReastaurantCard;
