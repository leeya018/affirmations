import { db } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { isUserExist } from "../user/isUserExist"

export const updateAffirmationApi = async (
  uid: string,
  affirmationInfo: any
) => {
  try {
    if (!isUserExist(uid)) {
      throw new Error(`User with id : ${uid} not found`)
    }
    const userRef = doc(db, "users", uid)

    await updateDoc(userRef, {
      affirmationInfo,
    })
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}
