import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useManualLocation from "../hooks/useManualLocation";
import getCoordinates from "../utils/getCoordinates";
import { LocationContext } from "../context/LocationContext";

function LocationSearch(props) {
  const { setManualLocation } = props;
  const [searchLocation, setSearchLocation] = useState("");
  const { setLocation } = useContext(LocationContext);
  const suggestions = useManualLocation(searchLocation);
  return (
    <div className=" md:w-[350px] w-full h-full bg-gray-50 absolute top-0 right-0 border-l-2 z-20">
      <div className="flex border-b-2 h-20 my-2 py-1 justify-center items-center">
        <FontAwesomeIcon
          onClick={() => setManualLocation(false)}
          icon={faX}
          className="absolute top-2 right-4 text-orange-500 cursor-pointer"
        />
        <input
          onChange={(e) => setSearchLocation(e.target.value)}
          type="text"
          className="border-2 border-gray-200 h-12 w-4/6 outline-none px-2"
          placeholder="Enter Your Location"
        />
      </div>
      <div className="flex flex-col">
        {suggestions?.length > 0 &&
          suggestions?.map((location, index) => {
            return (
              <div
                key={index}
                className="border-b-2 border-orange-200 border-dotted my-2 py-2 flex items-center"
              >
                <div>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-orange-500 px-4"
                  />{" "}
                </div>
                <div>
                  <p
                    data-address={location.address.city}
                    className="cursor-pointer "
                    onClick={async (e) => {
                      const coordinate = await getCoordinates(
                        e.target.getAttribute("data-address")
                      );
                      setLocation(coordinate);
                      setManualLocation(false);
                    }}
                  >
                    {location.address.city}
                  </p>
                  <p className="text-sm">{location.address.label}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default LocationSearch;
