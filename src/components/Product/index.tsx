import React, { FC } from "react";
import { ProductType } from "../../types";

const Product: FC<ProductType> = ({ img }) => {
  return (
    <div>
      <img src={img} alt="product image" />
    </div>
  );
};

export default Product;
