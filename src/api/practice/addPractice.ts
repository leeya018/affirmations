import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Practice } from "./interfaces";
import { isUserExist } from "../user/isUserExist";
import moment from "moment";

export const addPracticeApi = async (uid: string, practice: Practice) => {
  try {
    if (!isUserExist(uid)) {
      throw new Error(`User with id : ${uid} not found`);
    }

    let startDate = new Date();
    let endDate = new Date();

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);

    const collectionRef = collection(db, "practices");
    const q = query(
      collectionRef,
      where("userId", "==", uid),
      where("type", "==", practice.type),
      where("createdAt", ">=", startTimestamp),
      where("createdAt", "<=", endTimestamp)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const docRef = await addDoc(collectionRef, {
        ...practice,
        amount: 1,
        createdAt: serverTimestamp(),
      });
      console.log("practices added successfully");
      return docRef.id;
    }
    const practiceDoc = querySnapshot.docs[0];
    const practiceDocRef = practiceDoc.ref;
    const { amount } = practiceDoc.data();

    await updateDoc(practiceDocRef, { amount: amount + 1 });
  } catch (error: any) {
    console.log(error);
    console.log(error.message);
    throw error;
  }
};
