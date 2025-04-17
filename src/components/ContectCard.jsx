import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateContacts from "./AddAndUpdateContacts";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContectCard = ({ contects }) => {
  const { isOpen, onOpen, onClose } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contects", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contects.id}
        className="bg-yellow-200 flex justify-between items-center p-2 rounded-lg"
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-orange-400 text-4xl" />
          <div className="">
            <h2 className="font-medium">{contects.name}</h2>
            <p className="text-sm">{contects.email}</p>
          </div>
        </div>
        <div className="flex text-3xl gap-3">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContact(contects.id)}
            className="text-orange-400 cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateContacts
        contects={contects}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContectCard;
