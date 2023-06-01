import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function LocationSearch() {
  const [searchLocation, setSearchLocation] = useState("");
  console.log(searchLocation);
  useEffect(() => {
    const getLocation = setTimeout(() => {
      console.log("Got the location");
    }, 2000);
    return () => clearTimeout(getLocation);
  }, [searchLocation]);
  return (
    <div className=" w-1/3 h-full bg-gray-50 absolute top-0 right-0">
      <div className="flex border-b-2 h-20 my-2 py-1 justify-center items-center">
        <FontAwesomeIcon
          icon={faX}
          className="absolute top-2 right-4 text-red-500 cursor-pointer"
        />
        <input
          onChange={(e) => setSearchLocation(e.target.value)}
          type="text"
          className="border-2 border-gray-200 h-12 w-4/6 outline-none px-2"
          placeholder="Enter Your Location"
        />
      </div>
    </div>
  );
}

export default LocationSearch;
