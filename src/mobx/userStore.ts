import { User } from "@/api/user/interfaces";
import { makeAutoObservable } from "mobx";

class UserS {
  user: any = null;
  chosenDate = new Date();

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (newUser: any) => {
    if (!newUser) {
      this.user = null;
      return;
    }
    const { photoURL, uid, displayName, email } = newUser;
    this.user = { photoURL, uid, displayName, email };
  };

  updateUser = (info: any) => {
    this.user = { ...this.user, ...info };
  };
}

export const userStore = new UserS();
