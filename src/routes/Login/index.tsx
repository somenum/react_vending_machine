import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Form from "../../components/Form";
import Header from "../../components/Header";
import authStore from "../../stores/AuthStore/authStore";
import styles from "./Login.module.scss";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = async (email: string, password: string) => {
    await authStore.signIn({ email, password });
    toast.success("You have signed in");
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className={styles["login"]}>
        <Form title="Sign in" handleClick={handleSignIn} />;
      </div>
    </>
  );
};
export default observer(Login);
