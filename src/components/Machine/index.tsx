import React from "react";
import styles from "./Machine.module.scss";

const Machine = () => {
  return (
    <div className={styles["machine"]}>
      <div className={styles["machine-box"]}>
        <div className={styles["machine-product-row"]}>
          <div className={styles["product"]}></div>
          <div className={styles["product"]}></div>
        </div>
        <div className={styles["machine-product-row"]}>
          <div className={styles["product"]}></div>
          <div className={styles["product"]}></div>
        </div>
      </div>
    </div>
  );
};

export default Machine;
