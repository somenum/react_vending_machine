import { makeAutoObservable, runInAction } from "mobx";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase";
import { User } from "../../types";

export class AuthStore {
  user: User | null = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async signUp(user: User) {
    const auth = getAuth(app);
    const authResult = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    runInAction(() => {
      if (authResult.user) {
        this.user = user;
        this.error = "";
      }
    });
  }

  async signIn(user: User) {
    const auth = getAuth(app);
    const authResult = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    runInAction(() => {
      if (authResult.user) {
        this.user = user;
        this.error = "";
      }
    });
  }

  async signOut() {
    const auth = getAuth(app);

    await signOut(auth);

    runInAction(() => {
      this.user = null;
      this.error = "";
    });
  }
}

const authStore = new AuthStore();

export default authStore;
