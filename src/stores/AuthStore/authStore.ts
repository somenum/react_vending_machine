import { makeObservable, observable, action } from "mobx";
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
    makeObservable(this, {
      user: observable,
      error: observable,
      signUp: action,
      signIn: action,
      signOut: action,
    });
  }

  async signUp(user: User) {
    const auth = getAuth(app);
    try {
      const authResult = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      if (authResult.user) {
        this.user = user;
        this.error = "";
      }
    } catch (error) {
      if (error instanceof Error) {
        this.error = error.message;
      }
    }
  }

  async signIn(user: User) {
    const auth = getAuth(app);
    try {
      const authResult = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      if (authResult.user) {
        this.user = user;
        this.error = "";
      }
    } catch (error) {
      if (error instanceof Error) {
        this.error = error.message;
      }
    }
  }

  async signOut() {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      this.user = null;
      this.error = "";
    } catch (error) {
      if (error instanceof Error) {
        this.error = error.message;
      }
    }
  }
}

const authStore = new AuthStore();

export default authStore;
