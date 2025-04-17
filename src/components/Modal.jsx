import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
const Modal = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid place-items-center absolute top-0 z-40 h-screen w-screen backdrop-blur">
          <div className=" m-auto z-50 relative min-h-[200px] min-w-[80%] bg-white p-4">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClose}
                className="text-2xl self-end cursor-pointer"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
