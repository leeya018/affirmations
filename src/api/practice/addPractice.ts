import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "@/firebase"
import { Practice } from "./interfaces"
import { isUserExist } from "../user/isUserExist"

export const addPracticeApi = async (uid: string, practice: Practice) => {
  try {
    if (!isUserExist(uid)) {
      throw new Error(`User with id : ${uid} not found`)
    }
    const collectionRef = collection(db, "practices")
    const docRef = await addDoc(collectionRef, {
      practice,
      createdAt: serverTimestamp(),
    })
    console.log("practices added")
    return docRef.id
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}
