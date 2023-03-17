import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Form from "../../components/Form";
import Header from "../../components/Header";
import authStore from "../../stores/AuthStore/authStore";
import styles from "./Register.module.scss";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const handleSignUp = async (email: string, password: string) => {
    await authStore.signUp({ email, password });
    toast.success("You have signed up");
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className={styles["register"]}>
        <Form title="Sign up" handleClick={handleSignUp} />
      </div>
    </div>
  );
};
export default observer(Register);
