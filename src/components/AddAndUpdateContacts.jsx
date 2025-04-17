import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Requied"),
  email: Yup.string().email("Invalid Email").required("Email is Requied"),
});

const AddAndUpdateContacts = ({ isOpen, onClose, isUpdate, contects }) => {
  const addcontacts = async (contects) => {
    try {
      const contactRef = collection(db, "contects");
      await addDoc(contactRef, contects);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateContact = async (contects, id) => {
    try {
      const contactRef = doc(db, "contects", id);
      await updateDoc(contactRef, contects);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contects.name,
                  email: contects.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? UpdateContact(values, contects.id) : addcontacts(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <Field name="name" className="border h-10" />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="border h-10" />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button className="border px-3 py-1.5 bg-orange-400 self-end">
              {isUpdate ? "update" : "add"} contects
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContacts;
