import React from "react";
import { observer } from "mobx-react-lite";
import Form from "../../components/Form";
import Header from "../../components/Header";
import authStore from "../../stores/AuthStore/authStore";
import styles from "./Login.module.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSignIn = async (email: string, password: string) => {
    try {
      await authStore.signIn({ email, password });
      toast.success("You have successfully signed in");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
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
