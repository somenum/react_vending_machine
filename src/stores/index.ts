import { makeAutoObservable } from "mobx";

// import SessionStore from "./sessionStore";
import UserStore from "./userStore";

class RootStore {
  userStore = new UserStore();
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

const rootStore = new RootStore();

export default rootStore;
