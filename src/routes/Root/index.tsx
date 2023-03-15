import React from "react";
import Machine from "../../components/Machine";
import Header from "../../components/Header";

const Root = () => {
  return (
    <div>
      <Header />
      <h1>Vending machine app</h1>
      <Machine />
    </div>
  );
};

export default Root;
