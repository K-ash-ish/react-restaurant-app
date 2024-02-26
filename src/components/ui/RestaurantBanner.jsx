import React from "react";
import { IMG_CDN_URL } from "../../constant";

function RestaurantBanner({ restaurantInfo }) {
  return (
    <div className=" my-5 text-white restaurant-banner w-full flex md:justify-around  items-center ">
      <div className=" md:ml-48 hidden md:block">
        <img
          className="w-72"
          src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId}
          alt="restaurant-img"
        />
      </div>
      <div className="md:ml-24 md:h-52 md:w-72 w-full flex justify-around items-center  md:flex-col md:justify-center ">
        <div className="md:border-b-2  md:border-red-500 md:pb-2 md:px-2">
          <h1 className="text-2xl">{restaurantInfo?.name}</h1>
          <p className="font-thin text-lg">
            {restaurantInfo?.cuisines?.join(", ")}
          </p>
        </div>
        <div className=" mt-4 mb-2  flex flex-row items-center justify-around text-xs">
          <div className="">
            <p className="font-semibold text-lg my-1">
              {restaurantInfo?.avgRating || "--"} ⭐
            </p>
            <p>{restaurantInfo?.totalRatingsString}</p>
          </div>
          <div className="hidden md:block md:text-xl px-2">•</div>
          <div className="hidden md:flex flex-col">
            <p className="font-semibold text-lg my-1">
              {restaurantInfo?.sla?.slaString}
            </p>
            <p>Delivery time</p>
          </div>
          <div className="hidden md:block md:text-xl px-2">•</div>
          <div className="hidden md:flex flex-col">
            <p className="font-semibold text-lg my-1">
              <span className="text-green-500">₹</span>
              {restaurantInfo?.costForTwo.toString().slice(0, -2)}
            </p>
            <p>cost for two</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantBanner;
