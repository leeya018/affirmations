import { User } from "@/api/user/interfaces"
import { makeAutoObservable } from "mobx"

class UserS {
  user: any = null
  chosenDate = new Date()

  constructor() {
    makeAutoObservable(this)
  }

  setUser = (user: any) => {
    console.log("user", user)
    this.user = user
  }
}

export const userStore = new UserS()
