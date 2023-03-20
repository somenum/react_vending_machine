import React, { MouseEvent, FC, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import styles from "./Header.module.scss";
import authStore from "../../stores/AuthStore/authStore";
import { toJS } from "mobx";
import Button from "../Button";
import { toast } from "react-toastify";
import { User } from "../../types";

const Header: FC = () => {
  const [user, setUser] = useState<User | null>(toJS(authStore.user));
  const handleSignOut = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      await authStore.signOut();
      toast.success("You have successfully signed out");
      setUser(toJS(authStore.user));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <header className={styles["header"]}>
      <div>
        <NavLink to={"/"}>
          <img src={Logo} alt="logo" className={styles["header-logo"]} />
        </NavLink>
      </div>
      <div>
        {user !== null ? (
          <Button className={styles["header-navLink"]} onClick={handleSignOut}>
            Sign Out
          </Button>
        ) : (
          <>
            <NavLink to={"/signup"} className={styles["header-navLink"]}>
              Sign Up
            </NavLink>
            <NavLink to={"/signin"} className={styles["header-navLink"]}>
              Sign In
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
