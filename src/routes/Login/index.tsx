import React from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import store from "../../stores";
import Form from "../../components/Form";
import { DataForm } from "../../types";
import Header from "../../components/Header";
// import { setUser } from "../../app/slices/userSlice";

const Login = () => {
  // const navigate = useNavigate();

  const { userData } = store.userStore;

  const handleLogin = ({ email, password }: DataForm) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // userData = {
        //   email: user.email,
        //   id: user.uid,
        //   token: user.accessToken,
        // };
        console.log(user, userData);
        // navigate("/");
      })
      // eslint-disable-next-line no-alert
      .catch(() => toast.error("Invalid user"));
  };

  return (
    <>
      <Header />
      <Form title="Sign in" handleClick={handleLogin} />;
    </>
  );
};
export default observer(Login);
