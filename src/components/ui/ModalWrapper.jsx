import React from "react";

function ModalWrapper({ children, showModal, setShowModal }) {
  // #7772723a
  return (
    <div
      className={` z-10 fixed top-0 right-0 left-0 bottom-0  flex items-center justify-center transition-all duration-700  ${
        showModal
          ? "translate-y-0 bg-[#7772723a]"
          : "translate-y-20 opacity-0 pointer-events-none  "
      }`}
      onClick={() => setShowModal(false)}
    >
      {children}
    </div>
  );
}

export default ModalWrapper;
