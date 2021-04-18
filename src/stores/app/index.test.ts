import { AppStore } from "./index";
import { FetchRatesResponse } from "../../interfaces";
import { EMPTY_OPTION } from "../../utils";

interface Storage {
  [key: string]: string;
}

beforeAll(() => {
  const storage: Storage = { FAVORITE_CURRENCY_CODE_LOCALSTORAGE: "RUB" };
  spyOn(localStorage, "getItem").and.callFake((key) => (key in storage ? storage[key] : ""));
});

describe("AppStore created correctly", () => {
  it("if no currency code in localStore then favorite currency equals RUB", () => {
    const store = new AppStore();
    expect(store.favoriteCurrency).toBe("RUB");
  });
  it("'from' in created AppStore equals ''", () => {
    const store = new AppStore();
    expect(store.from).toBe("");
  });
  it("'to' in created AppStore equals favorite currency", () => {
    const store = new AppStore();
    expect(store.to).toBe(store.favoriteCurrency);
  });
  it("'amount' in created AppStore equals '1'", () => {
    const store = new AppStore();
    expect(store.amount).toBe("1");
  });
  it("'result' in created AppStore equals ''", () => {
    const store = new AppStore();
    expect(store.result).toBe("");
  });
  it("'fetchRatesResponse' in created AppStore equals null", () => {
    const store = new AppStore();
    expect(store.fetchRatesResponse).toBe(null);
  });
  it("'isFetchingData' in created AppStore equals false", () => {
    const store = new AppStore();
    expect(store.isFetchingData).toBe(false);
  });
  it("'favoriteCurrencies' in created AppStore equals []", () => {
    const store = new AppStore();
    expect(store.favoriteCurrencies).toStrictEqual([]);
  });
  it("'currencyCodes' in created AppStore equals undefined", () => {
    const store = new AppStore();
    expect(store.currencyCodes).toStrictEqual([]);
  });
});

describe("AppStore values changes correctly", () => {
  it("'favoriteCurrency' changes correctly", () => {
    const store = new AppStore();
    expect(store.favoriteCurrency).toBe("RUB");
    store.setFavoriteCurrency("USD");
    expect(store.favoriteCurrency).toBe("USD");
  });
  it("'from' changes correctly", () => {
    const store = new AppStore();
    expect(store.from).toBe("");
    store.setFrom("0");
    expect(store.from).toBe("0");
  });
  it("'to' changes correctly", () => {
    const store = new AppStore();
    expect(store.to).toBe("RUB");
    store.setTo("EUR");
    expect(store.to).toBe("EUR");
  });
  it("'amount' changes correctly", () => {
    const store = new AppStore();
    expect(store.amount).toBe("1");
    store.setAmount("2");
    expect(store.amount).toBe("2");
  });
  it("'result' changes correctly", () => {
    const store = new AppStore();
    expect(store.result).toBe("");
    store.setResult("0");
    expect(store.result).toBe("0");
  });
  it("'fetchRatesResponse' changes correctly", () => {
    const store = new AppStore();
    expect(store.fetchRatesResponse).toBe(null);
    const fetchRatesResponse: FetchRatesResponse = {
      base: "USD",
      date: "2021-01-01",
      rates: {
        EUR: 1.1,
      },
    };
    store.setFetchRatesResponse(fetchRatesResponse);
    expect(store.fetchRatesResponse).toStrictEqual(fetchRatesResponse);
  });
  it("'isFetchingData' changes correctly", () => {
    const store = new AppStore();
    expect(store.isFetchingData).toBe(false);
    store.setIsFetchingData(true);
    expect(store.isFetchingData).toBe(true);
  });
  it("'favoriteCurrencies' changes correctly", () => {
    const store = new AppStore();
    expect(store.favoriteCurrencies).toStrictEqual([]);
    const favoriteCurrencies: string[] = ["USD", "EUR"];
    store.setFavoriteCurrencies(favoriteCurrencies);
    expect(store.favoriteCurrencies).toStrictEqual(favoriteCurrencies);
  });
  it("computed 'currencyCodes' changes correctly", () => {
    const store = new AppStore();
    expect(store.fetchRatesResponse).toBe(null);
    const fetchRatesResponse: FetchRatesResponse = {
      base: "USD",
      date: "2021-01-01",
      rates: {
        EUR: 1.1,
      },
    };
    store.setFetchRatesResponse(fetchRatesResponse);
    expect(store.currencyCodes).toStrictEqual([EMPTY_OPTION, "EUR", "USD"]);
  });
});
