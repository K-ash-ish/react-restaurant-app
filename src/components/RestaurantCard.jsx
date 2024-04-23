import { IMG_CDN_URL } from "../constant";
function ReastaurantCard(props) {
  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRating,
    costForTwo,
    sla,
    handleClick,
  } = props;
  return (
    <div
      className="md:w-[250px] md:min-h-[240px] w-5/6 mx-auto min-h-[200px]  md:px-4 md:m-3 m-2  flex justify-around  md:flex-col gap-2 items-center  hover:shadow-lg hover:rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <div className=" md:w-full md:max-h-[120px] w-[100px] h-[100px] justify-center flex ">
        <img
          loading="lazy"
          className="rounded-xl min-h-full min-w-full  object-cover"
          src={IMG_CDN_URL + cloudinaryImageId}
          alt={name + "restaurant"}
          // width={120}
          // height={120}
        />
      </div>
      <div className="  md:w-full w-3/5 ">
        <h1 className="font-bold my-1">
          {name?.length > 20 ? name?.substring(0, 20) + "..." : name}
        </h1>
        <div className="cuisines  text-xs flex flex-wrap">
          <p>
            {cuisines?.join(", ").length > 20
              ? cuisines.join(",").substring(0, 30) + "..."
              : cuisines?.join(",")}
          </p>
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
