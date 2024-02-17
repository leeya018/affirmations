import { Timestamp } from "firebase/firestore"

export type User = {
  userId: string
  displayName: string
  email: string
  createdDate: Timestamp
}
