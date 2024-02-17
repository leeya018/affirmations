import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "@/firebase"
import { Practice } from "./interfaces"
import { isUserExist } from "../user/isUserExist"

export const getPracticesApi = async (uid: string) => {
  try {
    if (!isUserExist(uid)) {
      throw new Error(`User with id : ${uid} not found`)
    }
    const collectionRef = collection(db, "practices")
    const q = query(collectionRef, where("userId", "==", uid))
    const querySnapshot = await getDocs(q)
    const practices = querySnapshot.docs.map((doc) => doc.data())
    console.log({ practices })
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}
