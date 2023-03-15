import React, { FC } from "react";
import styles from "./Machine.module.scss";
import Product from "../Product";

const Machine: FC = () => {
  return (
    <div className={styles["machine"]}>
      <div className={styles["machine-box"]}>
        <div className={styles["machine-product-box"]}>
          <Product img={""} />
          <Product img={""} />
          <Product img={""} />
          <Product img={""} />
        </div>
      </div>
    </div>
  );
};

export default Machine;
