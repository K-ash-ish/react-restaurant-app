import { faClose, faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalWrapper from "./ModalWrapper";

function Modal(props) {
  const { setIsOpen, isOpen, customClass, children } = props;
  return (
    <ModalWrapper setShowModal={setIsOpen} showModal={isOpen}>
      <div
        className={` flex flex-col relative   bg-white rounded-md shadow-md  ${customClass} `}
      >
        <button
          className="absolute right-2 top-1"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <FontAwesomeIcon icon={faClose} className="text-red-500" />
        </button>
        {children}
      </div>
    </ModalWrapper>
  );
}

export default Modal;
