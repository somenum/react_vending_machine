import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import styles from "./Header.module.scss";
import { toJS } from "mobx";
import Button from "../Button";
import authStore from "../../stores/AuthStore/authStore";

const Header: FC = () => {
  const user = toJS(authStore.user);
  const handleSignOut = async (event: React.FormEvent) => {
    event.preventDefault();
    await authStore.signOut();
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
