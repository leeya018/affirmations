import { navNames } from "@/util"
import { autorun, makeAutoObservable } from "mobx"

class Nav {
  selectedName: string = navNames.home
  constructor() {
    makeAutoObservable(this)
  }

  setSelectedName = (name: string) => {
    this.selectedName = name
  }
}

const navStore = new Nav()
export default navStore

autorun(() => {
  console.log(navStore.selectedName)
})
