import { Timestamp } from "firebase/firestore"

export type Affirmation = {
  userId: string
  name: string
  imageUrl: string
  audioUrl: string
  createdAt?: Timestamp
}
