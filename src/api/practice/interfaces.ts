import { Timestamp } from "firebase/firestore"

export type Practice = {
  userId: string
  affirmationId: string
  type: string
  createdDate?: Timestamp
}
