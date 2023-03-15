import { makeAutoObservable } from "mobx";
import { User } from "../types";

class UserStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  user: User = {
    id: "",
    token: "",
    email: "",
  };
  setUserData = (user: User) => {
    this.user = user;
  };

  get userData() {
    return this.user;
  }
}

export default UserStore;
