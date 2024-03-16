import { useState } from "react";
import { IMG_CDN_URL } from "../../constant";
import { createPortal } from "react-dom";
import Modal from "./Modal";
function FilteredItem({ item, handleClick }) {
  const [showDescription, setShowDescription] = useState(false);
  const {
    card: {
      info: { price, defaultPrice, description, imageId, name },
    },
  } = item;
  return (
    <div className="flex md:justify-between   md:my-4 border-b-2 md:pb-3">
      <div className=" w-2/3 flex flex-col  justify-center items-start">
        <h2 className="font-medium text-lg">{name}</h2>
        <p className="my-2">
          <span className="text-green-500">₹</span>
          {price?.toString()?.slice(0, -2) ||
            defaultPrice?.toString()?.slice(0, -2)}
        </p>
        {description ? (
          <>
            {showDescription &&
              createPortal(
                <Modal
                  isOpen={showDescription}
                  setIsOpen={setShowDescription}
                  content={description}
                  customClass={
                    "p-1 font-thin text-xs flex items-center px-2 border-2 border-orange-100 w-[300px] min-h-[60px]   "
                  }
                >
                  <div className="flex flex-col gap-1 py-1">
                    <h4 className="text-sm font-semibold">Description</h4>
                    <p className="font-thin text-xs ">{description}</p>
                  </div>
                </Modal>,
                document.body
              )}
            <button
              className=" text-xs underline decoration-red-500 underline-offset-1 font-light"
              onClick={() => {
                setShowDescription(true);
              }}
            >
              Description
            </button>
          </>
        ) : null}
      </div>
      <div className=" px-2 flex md:flex-row flex-wrap flex-col justify-around  md:justify-between  items-center w-1/3  h-36">
        {imageId ? (
          <img
            src={IMG_CDN_URL + imageId}
            alt={name}
            className="md:w-32 w-28 rounded-lg y-0 mx-auto"
          />
        ) : null}
        <button
          onClick={(e) => {
            const dishName = name;
            const dishPrice =
              price?.toString()?.slice(0, -2) ||
              defaultPrice?.toString()?.slice(0, -2);
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
}
// filter by getting Category then inside the category filtering the menu items
function FilterMenu({ categories, handleClick }) {
  return (
    <div className=" flex flex-col " id={categories?.title}>
      <h1 className="font-medium text-xl underline decoration-red-500 underline-offset-4 my-4 md:my-0">
        {categories?.title}
      </h1>
      {/* filtering menu ITEMS by category*/}
      {categories?.itemCards?.map((item) => {
        return (
          <FilteredItem
            key={item?.card?.info?.id}
            handleClick={handleClick}
            item={item}
          />
        );
      })}
    </div>
  );
}

export default FilterMenu;
