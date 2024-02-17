import { makeAutoObservable } from "mobx"

class UserS {
  user: User | null = null
  chosenDate = new Date()

  constructor() {
    makeAutoObservable(this)
  }

  setUser = (user: User) => {
    console.log("user", user)
    this.user = user
  }
  updateUser = (userInfo: any) => {
    console.log("userInfo", userInfo)
    this.user = { ...this.user, ...userInfo }
  }
  setChosenDate = (date: Date) => {
    console.log("date", date)

    this.chosenDate = date
  }
}

export const userStore = new UserS()
