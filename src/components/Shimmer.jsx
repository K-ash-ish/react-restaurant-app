function RestaurantCardShimmer() {
  return (
    <div className="animate-pulse card w-full  p-4 m-3  flex  md:flex-col  items-center justify-around  bg-gray-100">
      <div className="animate-pulse restaurant-img md:w-full  w-1/4 h-24 flex items-center border-2 bg-gray-200"></div>
      <div className="card-details  animate-pulse md:w-full w-3/5 border-2 h-16 bg-gray-200"></div>
    </div>
  );
}
function RestaurantsShimmer() {
  return (
    <div className="my-0 mx-auto  flex flex-col  sm:flex-row sm:w-5/6 w-full  sm:flex-wrap items-center justify-center ">
      {Array(8)
        .fill("")
        .map((d, index) => (
          <RestaurantCardShimmer key={index} />
        ))}
    </div>
  );
}
export { RestaurantsShimmer, RestaurantCardShimmer };
