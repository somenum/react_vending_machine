import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./Machine.module.scss";
import Product from "../Product";
import vendingMachineStore from "../../stores/VendingMachineStore/vendingMachineStore";
import authStore from "../../stores/AuthStore/authStore";
import { Beverage } from "../../types";
import { toast } from "react-toastify";
import Button from "../Button";
import logoMachine from "../../assets/candies.svg";
import dollarIcon from "../../assets/dollar-coin.png";
import fiftyCentsIcon from "../../assets/50-cents-coin.png";
import twentyFiveCentsIcon from "../../assets/25-cents-coin.png";
import line from "../../assets/line.png";
import { toJS } from "mobx";

const Machine: FC = () => {
  const [selectedBeverage, setSelectedBeverage] = useState<Beverage | null>(
    null
  );
  const [payment, setPayment] = useState<number>(0);

  const user = toJS(authStore.user);

  const beveragesArr = vendingMachineStore.getBeverages();
  const coinsArr = vendingMachineStore.getCoins();

  const handleSelectBeverage = (beverage: Beverage) => {
    setSelectedBeverage(beverage);
  };

  const handleCoinClick = (coinValue: number) => {
    setPayment((prevPayment) => prevPayment + coinValue);
  };

  const handlePurchase = () => {
    if (selectedBeverage) {
      const message = vendingMachineStore.purchaseBeverage(
        selectedBeverage,
        payment
      );
      setSelectedBeverage(null);
      setPayment(0);
      toast.info(message);
    }
  };

  return (
    <div className={styles["machine"]}>
      <div className={styles["machine-box"]}>
        <div className={styles["machine-logo-container"]}>
          <img
            src={logoMachine}
            alt="logo vending machine"
            className={styles["machine-logo"]}
          />
        </div>
        {user !== null ? (
          <div className={styles["coinsLeft-container"]}>
            {coinsArr.map((coin) => (
              <div className={styles["coinsLeft"]} key={coin.value}>
                {coin.value === 1 && (
                  <img
                    src={dollarIcon}
                    alt="one dollar coin"
                    className={styles["icon"]}
                  />
                )}
                {coin.value === 0.5 && (
                  <img
                    src={fiftyCentsIcon}
                    alt="fifty cents coin"
                    className={styles["icon"]}
                  />
                )}
                {coin.value === 0.25 && (
                  <img
                    src={twentyFiveCentsIcon}
                    alt="twenty five cents coin"
                    className={styles["icon"]}
                  />
                )}
                &nbsp;{coin.count} left
              </div>
            ))}
          </div>
        ) : (
          <img src={line} alt="line" className={styles["text"]} />
        )}
        <div>
          <div className={styles["payment-container"]}>
            <h3>Payment: ${payment.toFixed(2)}</h3>

            <div className={styles["buttonCoin-container"]}>
              <Button
                onClick={() => handleCoinClick(0.25)}
                className={styles["buttonCoin"]}
              >
                <img
                  src={twentyFiveCentsIcon}
                  alt="twenty five cents coin"
                  className={styles["icon"]}
                />
              </Button>
              <Button
                onClick={() => handleCoinClick(0.5)}
                className={styles["buttonCoin"]}
              >
                <img
                  src={fiftyCentsIcon}
                  alt="fifty cents coin"
                  className={styles["icon"]}
                />
              </Button>
              <Button
                onClick={() => handleCoinClick(1)}
                className={styles["buttonCoin"]}
              >
                <img
                  src={dollarIcon}
                  alt="one dollar coin"
                  className={styles["icon"]}
                />
              </Button>
            </div>
          </div>
          <div className={styles["payment-container"]}>
            <h3>
              {`Selected: ${
                selectedBeverage ? selectedBeverage?.name.toUpperCase() : ""
              }`}
            </h3>
            <div className={styles["button-container"]}>
              <Button
                onClick={handlePurchase}
                className={styles["machine-btn"]}
                buttonStyle="primary"
                disabled={!selectedBeverage}
              >
                Purchase
              </Button>
            </div>
          </div>
        </div>

        <div className={styles["machine-product-box"]}>
          {beveragesArr.map((item, index) => (
            <Product
              beverage={item}
              key={index + item.name}
              handleSelectBeverage={handleSelectBeverage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(Machine);
