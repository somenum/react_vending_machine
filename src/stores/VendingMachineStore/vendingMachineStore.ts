import { makeAutoObservable } from "mobx";
import { Coin, Beverage } from "../../types";
import colaImg from "../../assets/coca-cola.png";
import fantaImg from "../../assets/fanta.png";
import spriteImg from "../../assets/sprite.png";
import waterImg from "../../assets/water.png";

export class VendingMachineStore {
  private coins: Coin[] = [
    { value: 1, count: 20 },
    { value: 0.5, count: 20 },
    { value: 0.25, count: 60 },
  ];

  private beverages: Beverage[] = [
    { name: "Cola", price: 2.5, count: 5, img: colaImg },
    { name: "Fanta", price: 1.75, count: 5, img: fantaImg },
    { name: "Sprite", price: 2.25, count: 5, img: spriteImg },
    { name: "Water", price: 1.5, count: 5, img: waterImg },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  getCoins(): Coin[] {
    return this.coins;
  }

  getBeverages(): Beverage[] {
    return this.beverages;
  }

  purchaseBeverage(beverage: Beverage, payment: number): string {
    if (beverage.count === 0) {
      return "Sorry, this beverage is out of stock.";
    }

    if (payment < beverage.price) {
      return "Please insert more coins.";
    }

    const change = payment - beverage.price;

    if (this.getTotalChange() < change) {
      return "Sorry, not enough change.";
    }

    beverage.count--;
    const changeForCustomer = this.giveChange(change);

    return `Enjoy your ${beverage.name}!
          Change:
            1 dollar bills: ${
              changeForCustomer.find((coin) => coin.value === 1)?.count ?? 0
            } + 50 cent coins: ${
      changeForCustomer.find((coin) => coin.value === 0.5)?.count ?? 0
    } + 25 cent coins: ${
      changeForCustomer.find((coin) => coin.value === 0.25)?.count ?? 0
    }`;
  }

  giveChange(amount: number): Coin[] {
    let remainingAmount = amount;
    const change: Coin[] = [];

    this.coins.forEach((coin) => {
      const maxCount = Math.min(
        Math.floor(remainingAmount / coin.value),
        coin.count
      );
      remainingAmount -= maxCount * coin.value;
      coin.count -= maxCount;
      if (maxCount > 0) {
        change.push({ value: coin.value, count: maxCount });
      }
    });

    return change;
  }

  getTotalChange(): number {
    return this.coins.reduce(
      (total, coin) => total + coin.value * coin.count,
      0
    );
  }
}

const vendingMachineStore = new VendingMachineStore();

export default vendingMachineStore;
