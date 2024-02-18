import { Affirmation } from "@/api/affirmation/interfaces"
import { makeAutoObservable } from "mobx"

class AffirmationS {
  affirmation: Affirmation | null = null

  constructor() {
    makeAutoObservable(this)
  }

  updateAffirmation = (affirmInfo: any) => {
    this.affirmation = { ...this.affirmation, ...affirmInfo }
  }
}

export const affirmationsStore = new AffirmationS()
