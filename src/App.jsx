import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContectCard from "./components/ContectCard";
import AddAndUpdateContacts from "./components/AddAndUpdateContacts";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contects, setContects] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclouse();

  useEffect(() => {
    const getContects = async () => {
      try {
        const contectsRef = collection(db, "contects");
        onSnapshot(contectsRef, (snapshot) => {
          const contectList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContects(contectList);
          return contectList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContects();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contectsRef = collection(db, "contects");
    onSnapshot(contectsRef, (snapshot) => {
      const contectLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contectLists.filter((Contact) =>
        Contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContects(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute text-white text-3xl ml-1" />
            <input
              onChange={filterContacts}
              type="text"
              className=" flex-grow rounded-md border border-white bg-transparent h-10 text-white pl-10"
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl text-white cursor-pointer"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contects.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contects.map((contects) => (
              <ContectCard key={contects.id} contects={contects} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContacts onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
