import { Timestamp } from "firebase/firestore"

export type Practice = {
  userId: string
  amount?: number
  type: string
  createdAt?: Timestamp
}
