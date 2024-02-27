import { useState } from "react";
import { IMG_CDN_URL } from "../../constant";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import { v4 as uuidv4 } from "uuid";

// filter by getting Category then inside the category filtering the menu items
function FilterMenu({ categories, handleClick }) {
  return (
    <div className=" flex flex-col ">
      <h1 className="font-medium text-xl underline decoration-red-500 underline-offset-4 my-4 md:my-0">
        {categories?.title}
      </h1>
      {/* filtering menu ITEMS */}
      {categories?.itemCards?.map((item) => {
        const [showDescription, setShowDescription] = useState(false);
        return (
          <div
            key={uuidv4()}
            className="flex md:justify-between   md:my-4 border-b-2 md:pb-3"
          >
            <div className=" w-2/3 flex flex-col  justify-center items-start">
              <h2 className="font-medium text-lg">{item?.card?.info?.name}</h2>
              <p className="my-2">
                <span className="text-green-500">₹</span>
                {item?.card?.info?.price?.toString()?.slice(0, -2) ||
                  item?.card?.info?.defaultPrice?.toString()?.slice(0, -2)}
              </p>
              {item?.card?.info?.description ? (
                <>
                  {showDescription &&
                    createPortal(
                      <Modal
                        isOpen={showDescription}
                        setIsOpen={setShowDescription}
                        content={item?.card?.info?.description}
                        customClass={
                          "p-1 font-thin text-xs flex items-center px-2 border-2 border-orange-100 w-[300px] min-h-[60px] top-[calc(50%-50px)]   "
                        }
                      >
                        <div className="flex flex-col gap-1 py-1">
                          <h4 className="text-sm font-semibold">Description</h4>
                          <p className="font-thin text-xs ">
                            {item?.card?.info?.description}
                          </p>
                        </div>
                      </Modal>,
                      document.body
                    )}
                  <button
                    className=" text-xs underline decoration-red-500 underline-offset-1 font-light"
                    onClick={() => {
                      document
                        .getElementById("root")
                        .classList.toggle("blur-sm");
                      setShowDescription(true);
                    }}
                  >
                    Description
                  </button>
                </>
              ) : null}
            </div>
            <div className=" px-2 flex md:flex-row flex-wrap flex-col justify-around  md:justify-between  items-center w-1/3  h-36">
              {item?.card?.info?.imageId ? (
                <img
                  src={IMG_CDN_URL + item?.card?.info?.imageId}
                  alt={item?.card?.info?.name}
                  className="md:w-32 w-28 rounded-lg y-0 mx-auto"
                />
              ) : (
                <div></div>
              )}
              <button
                onClick={(e) => {
                  const dishName = item?.card?.info?.name;
                  const dishPrice =
                    item?.card?.info?.price?.toString()?.slice(0, -2) ||
                    item?.card?.info?.defaultPrice?.toString()?.slice(0, -2);
                  const quantity = 1;
                  handleClick({ dishName, dishPrice, quantity });
                }}
                className="my-0 mx-auto border-2  h-10  px-4 hover:shadow-md"
              >
                Add
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FilterMenu;
