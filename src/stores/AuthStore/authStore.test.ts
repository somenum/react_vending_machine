import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase";
import { AuthStore } from "./authStore";
import { User } from "../../types";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

describe("AuthStore", () => {
  let authStore: AuthStore;
  const mockUser: User = { email: "test@example.com", password: "password" };
  const mockAuth = getAuth(app);

  beforeEach(() => {
    authStore = new AuthStore();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("signUp", () => {
    it("sets user and clears error on successful sign up", async () => {
      const mockAuthResult = { user: { uid: "test-uid" } };
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockAuthResult
      );

      await authStore.signUp(mockUser);

      expect(getAuth).toHaveBeenCalledWith(app);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        mockUser.email,
        mockUser.password
      );
      expect(authStore.user).toEqual(mockUser);
      expect(authStore.error).toEqual("");
    });

    it("sets error on failed sign up", async () => {
      const mockError = new Error("Failed to sign up");
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
        mockError
      );

      await authStore.signUp(mockUser);

      expect(getAuth).toHaveBeenCalledWith(app);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        mockUser.email,
        mockUser.password
      );
      expect(authStore.user).toBeNull();
      expect(authStore.error).toEqual(mockError.message);
    });
  });

  describe("signIn", () => {
    it("sets user and clears error on successful sign in", async () => {
      const mockAuthResult = { user: { uid: "test-uid" } };
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockAuthResult
      );

      await authStore.signIn(mockUser);

      expect(getAuth).toHaveBeenCalledWith(app);
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        mockUser.email,
        mockUser.password
      );
      expect(authStore.user).toEqual(mockUser);
      expect(authStore.error).toEqual("");
    });

    it("sets error on failed sign in", async () => {
      const mockError = new Error("Failed to sign in");
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(mockError);

      await authStore.signIn(mockUser);

      expect(getAuth).toHaveBeenCalledWith(app);
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        mockUser.email,
        mockUser.password
      );
      expect(authStore.user).toBeNull();
      expect(authStore.error).toEqual(mockError.message);
    });
  });

  describe("signOut", () => {
    it("clears user and error on successful sign out", async () => {
      await authStore.signOut();

      expect(getAuth).toHaveBeenCalledWith(app);
      expect(signOut).toHaveBeenCalledWith(mockAuth);
      expect(authStore.user).toBeNull();
      expect(authStore.error).toEqual("");
    });

    it("sets error on failed sign out", async () => {
      const mockError = new Error("Failed to sign out");
      (signOut as jest.Mock).mockRejectedValue(mockError);

      await authStore.signOut();

      expect(getAuth).toHaveBeenCalledWith(app);
      expect(signOut).toHaveBeenCalledWith(mockAuth);
      expect(authStore.user).toBeNull();
      expect(authStore.error).toEqual(mockError.message);
    });
  });
});
