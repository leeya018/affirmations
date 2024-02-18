import { Timestamp } from "firebase/firestore"

export type Practice = {
  userId: string
  type: string
  createdDate?: Timestamp
}
