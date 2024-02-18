import { db } from "@/firebase"
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { isUserExist } from "../user/isUserExist"

export const updateAffirmationApi = async (
  uid: string,
  affirmationInfo: any
) => {
  try {
    console.log({ uid, affirmationInfo })
    if (!isUserExist(uid)) {
      throw new Error(`User with id : ${uid} not found`)
    }
    const collectionRef = collection(db, "affirmations")
    const q = query(collectionRef, where("userId", "==", uid))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      await addDoc(collectionRef, {
        userId: uid,
        createdAt: serverTimestamp(),
        ...affirmationInfo,
      })
      return
    }
    const docRef = querySnapshot.docs[0].ref

    await updateDoc(docRef, affirmationInfo)
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}
