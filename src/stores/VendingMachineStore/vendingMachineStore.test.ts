import { VendingMachineStore } from "./vendingMachineStore";

describe("VendingMachineStore", () => {
  let vendingMachineStore: VendingMachineStore;

  beforeEach(() => {
    vendingMachineStore = new VendingMachineStore();
  });

  it("should return all available coins", () => {
    const coins = vendingMachineStore.getCoins();

    expect(coins).toEqual([
      { value: 1, count: 20 },
      { value: 0.5, count: 20 },
      { value: 0.25, count: 60 },
    ]);
  });

  it("should return all available beverages", () => {
    const beverages = vendingMachineStore.getBeverages();

    expect(beverages).toEqual([
      {
        name: "Cola",
        price: 2.5,
        count: 5,
        img: expect.anything(),
      },
      {
        name: "Fanta",
        price: 1.75,
        count: 5,
        img: expect.anything(),
      },
      {
        name: "Sprite",
        price: 2.25,
        count: 5,
        img: expect.anything(),
      },
      {
        name: "Water",
        price: 1.5,
        count: 5,
        img: expect.anything(),
      },
    ]);
  });

  it("should return correct change for a purchase", () => {
    const beverage = vendingMachineStore.getBeverages()[0];
    const payment = 5;

    const result = vendingMachineStore.purchaseBeverage(beverage, payment);

    expect(result).toMatchInlineSnapshot(`
      "Enjoy your Cola!
                Change:
                  1 dollar bills: 2 + 50 cent coins: 1 + 25 cent coins: 0"
    `);
  });

  it("should return out of stock message if the beverage is out of stock", () => {
    const beverage = vendingMachineStore.getBeverages()[0];
    beverage.count = 0;
    const payment = 5;

    const result = vendingMachineStore.purchaseBeverage(beverage, payment);

    expect(result).toBe("Sorry, this beverage is out of stock.");
  });

  it("should return insert more coins message if payment is not enough", () => {
    const beverage = vendingMachineStore.getBeverages()[0];
    const payment = 1;

    const result = vendingMachineStore.purchaseBeverage(beverage, payment);

    expect(result).toBe("Please insert more coins.");
  });

  it("should return not enough change message if there is not enough change", () => {
    const beverage = vendingMachineStore.getBeverages()[0];
    const payment = 1000;

    const result = vendingMachineStore.purchaseBeverage(beverage, payment);

    expect(result).toBe("Sorry, not enough change.");
  });
});
