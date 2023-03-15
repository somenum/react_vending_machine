import React, { FC } from "react";
import styles from "./Product.module.scss";
import PropTypes from "prop-types";

const propTypes = {
  img: PropTypes.string.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

const Product: FC<Props> = ({ img }) => {
  return (
    <div className={styles["product"]}>
      <img src={img} alt="product" />
    </div>
  );
};

Product.propTypes = propTypes;
export default Product;
