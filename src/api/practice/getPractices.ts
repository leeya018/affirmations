import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Practice } from "./interfaces";
import moment from "moment";
import { isUserExistApi } from "../user/isUserExist";

export const getPracticesApi = async (uid: string, date: moment.Moment) => {
  if (!isUserExistApi(uid)) {
    throw new Error(`User with id : ${uid} not found`);
  }
  const month = date.month();
  const year = date.year();

  const startDate = new Date(year, month, 1); // Month is 0-indexed
  const endDate = new Date(year, month + 1, 0); // Last day of the month
  console.log({ startDate, endDate });

  // Convert dates to Firestore Timestamps
  const startTimestamp = Timestamp.fromDate(startDate);
  const endTimestamp = Timestamp.fromDate(endDate);
  console.log({ startTimestamp, endTimestamp });
  const collectionRef = collection(db, "practices");
  const q = query(
    collectionRef,
    where("userId", "==", uid),
    where("createdAt", ">=", startTimestamp),
    where("createdAt", "<=", endTimestamp),
    orderBy("createdAt")
  );
  const querySnapshot = await getDocs(q);
  const practices = querySnapshot.docs.map((doc) => doc.data());
  // console.log({ practices })
  return practices;
};
