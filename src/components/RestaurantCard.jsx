import { IMG_CDN_URL } from "../constant";
function ReastaurantCard(props) {
  const { name, cuisines, cloudinaryImageId, avgRating, totalRatings } = props;
  return (
    <div className="card h-5/6 border-2 flex flex-col">
      <img
        className="w-1/3"
        src={IMG_CDN_URL + cloudinaryImageId}
        alt="restaurant-image"
      />
      <h1>{name}</h1>
      <div className="cuisines">
        {cuisines.map((cuisine) => {
          return <p>{cuisine}</p>;
        })}
      </div>
      <div className="ratings">
        <p>{avgRating}</p>
        <p>{totalRatings}</p>
      </div>
    </div>
  );
}

export default ReastaurantCard;
