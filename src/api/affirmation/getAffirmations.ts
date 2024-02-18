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
import { isUserExist } from "../user/isUserExist"

export const getAffirmationsApi = async (uid: string) => {
  try {
    if (!isUserExist(uid)) {
      throw new Error(`User with id : ${uid} not found`)
    }
    const collectionRef = collection(db, "affirmations")
    const q = query(collectionRef, where("userId", "==", uid))
    const querySnapshot = await getDocs(q)
    const affirmations = querySnapshot.docs.map((doc) => doc.data())
    console.log({ affirmations })
    return affirmations.length > 0 ? affirmations[0] : null
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}
