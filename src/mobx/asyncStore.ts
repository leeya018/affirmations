import { makeAutoObservable } from "mobx"

class Async {
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading
  }
}

export const AsyncStore = new Async()
