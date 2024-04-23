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
    <div className="my-4 mx-auto  flex flex-col  sm:flex-row sm:w-5/6 w-full  sm:flex-wrap items-center justify-center ">
      {Array(8)
        .fill("")
        .map((_, index) => (
          <RestaurantCardShimmer key={index} />
        ))}
    </div>
  );
}
function RestaurantPageShimmer() {
  return (
    <div className="flex bg-gray-0 w-full flex-1 flex-col justify-around items-center bg-slate-50">
      <div className=" my-5 text-white md:h-[250px] h-[200px] bg-[#333958] w-full  animate-pulse "></div>
      <div className="flex md:flex-row flex-col justify-center items-center">
        {Array(2)
          .fill("")
          .map((_, index) => {
            return (
              <div
                key={index}
                className="animate-pulse md:w-[300px] w-[350px] h-[150px]   p-4 m-3  flex rounded-md  md:flex-col  md:items-center justify-around  bg-gray-100"
              >
                <div className="animate-pulse restaurant-img w-full   md:h-24 h-16 flex items-center border-2 bg-gray-200"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export { RestaurantsShimmer, RestaurantCardShimmer, RestaurantPageShimmer };
