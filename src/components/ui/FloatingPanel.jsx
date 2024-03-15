import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function FloatingPanel({
  showPanel,
  setShowPanel,
  children,
  customClass = "",
}) {
  return (
    <div
      className={`  ${customClass} bg-gray-50  px-2 py-1 mx-auto  rounded-xl shadow-md    
               transition-all ease-in-out duration-700 ${
                 showPanel
                   ? "translate-y-0"
                   : "translate-y-20 opacity-0 pointer-events-none border-none "
               }`}
    >
      <button
        className="absolute right-2 text-red-500 text-sm hover:bg-gray-100 px-1 rounded-md"
        onClick={() => {
          setShowPanel(false);
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      {children}
    </div>
  );
}

export default FloatingPanel;
