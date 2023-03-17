import React, { FC } from "react";
import styles from "./Product.module.scss";
import PropTypes from "prop-types";
import Button from "../Button";

const propTypes = {
  beverage: PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  handleSelectBeverage: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

const Product: FC<Props> = ({ beverage, handleSelectBeverage }) => {
  return (
    <div className={styles["product"]}>
      <div className={styles["product-items"]}>{beverage.count}</div>
      <div className={styles["product-img-container"]}>
        <img
          src={beverage.img}
          alt="beverage"
          className={styles["product-img"]}
        />
      </div>
      <div className={styles["product-price"]}>
        ${beverage.price.toFixed(2)}
      </div>
      {beverage.count > 0 ? (
        <Button
          onClick={() => handleSelectBeverage(beverage)}
          buttonStyle="primary"
          className={styles["button"]}
        >
          {beverage.name}
        </Button>
      ) : (
        <div className={styles["sold"]}>Sold out</div>
      )}
    </div>
  );
};

Product.propTypes = propTypes;
export default Product;
