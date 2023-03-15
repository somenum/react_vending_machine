import React from "react";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { User } from "@firebase/auth-types";
import store from "../../stores";
import { app } from "../../firebase";
import Form from "../../components/Form";
import Header from "../../components/Header";
// import { setUser } from "../../app/slices/userSlice";

const Register = () => {
  // const navigate = useNavigate();

  const { setUserData } = store.userStore;

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((UserCredential) => {
        setUserData({
          email: UserCredential.user.email,
          id: UserCredential.user.uid,
          token: UserCredential.user.accessToken,
        });
        // navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Header />
      <Form title="Sign up" handleClick={handleRegister} />
    </>
  );
};
export default observer(Register);
