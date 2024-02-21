import { Timestamp } from "firebase/firestore"

export type User = {
  userId: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  createdAt?: Timestamp
}
