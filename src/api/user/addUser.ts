import { db } from "@/firebase"
import { doc, setDoc } from "firebase/firestore"
import { User } from "./interfaces"

export const addUserApi = async (user: User) => {
  try {
    const docRef = doc(db, "users", user.userId)
    await setDoc(docRef, user)
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}
