import React from "react";

function ModalWrapper({ children, showModal, setShowModal }) {
  return (
    <div
      data-modal="modal"
      className={` z-10 fixed top-0 right-0 left-0 bottom-0  flex items-center justify-center transition-all duration-700  ${
        showModal ? " bg-[#7772723a]" : " opacity-0 pointer-events-none  "
      }`}
      onClick={(e) => {
        if (e.target.hasAttribute("data-modal")) setShowModal(false);
      }}
    >
      {children}
    </div>
  );
}

export default ModalWrapper;
