
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const itemsRef = collection(db, "items");

// CREATE
export const createItem = async (itemData) => {
  const docRef = await addDoc(itemsRef, itemData);
  return { id: docRef.id, ...itemData };
};

// READ
export const fetchItems = async () => {
  const querySnapshot = await getDocs(itemsRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// UPDATE
export const updateItem = async ({ id, data }) => {
  const itemDoc = doc(db, "items", id);
  await updateDoc(itemDoc, data);
  return { id, ...data };
};

// DELETE
export const deleteItem = async (id) => {
  const itemDoc = doc(db, "items", id);
  await deleteDoc(itemDoc);
  return id;
};
