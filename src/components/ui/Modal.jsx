import { faClose, faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Modal(props) {
  const { setIsOpen, customClass, children } = props;
  return (
    <div
      className={` flex flex-col   bg-white rounded-md shadow-md fixed left-[calc(50%-150px)]  ${customClass} `}
    >
      <button
        className="absolute right-2 top-1"
        onClick={() => {
          document.getElementById("root").classList.remove("blur-sm");
          setIsOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faClose} className="text-red-500" />
      </button>
      {children}
    </div>
  );
}

export default Modal;
