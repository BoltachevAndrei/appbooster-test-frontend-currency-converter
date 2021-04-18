import { createContext } from "react";
import { computed, makeAutoObservable } from "mobx";
import { CurrencyCode, FetchRatesResponse } from "../../interfaces";
import { removeDuplicatesFromArray, EMPTY_OPTION, FAVORITE_CURRENCY_CODE_LOCALSTORAGE } from "../../utils";

export class AppStore {
  favoriteCurrency: string = (localStorage.getItem(FAVORITE_CURRENCY_CODE_LOCALSTORAGE) as string) || "RUB";
  from: CurrencyCode = "";
  to: CurrencyCode = this.favoriteCurrency;
  amount: string = "1";
  result: string = "";
  fetchRatesResponse: FetchRatesResponse | null = null;
  isFetchingData: boolean = false;
  favoriteCurrencies: string[] = [];

  constructor() {
    makeAutoObservable(this, {
      currencyCodes: computed,
    });
  }

  setFrom = (from: CurrencyCode): void => {
    this.from = from;
  };

  setTo = (to: CurrencyCode): void => {
    this.to = to;
  };

  setAmount = (amount: string): void => {
    this.amount = amount;
  };

  setFavoriteCurrency = (favoriteCurrency: string): void => {
    this.favoriteCurrency = favoriteCurrency;
  };

  setResult = (result: string): void => {
    this.result = result;
  };

  setFetchRatesResponse = (fetchRatesResponse: FetchRatesResponse): void => {
    this.fetchRatesResponse = fetchRatesResponse;
  };

  setIsFetchingData = (isFetchingData: boolean): void => {
    this.isFetchingData = isFetchingData;
  };

  setFavoriteCurrencies = (favoriteCurrencies: string[]): void => {
    this.favoriteCurrencies = favoriteCurrencies;
  };

  get currencyCodes(): string[] {
    if (this.fetchRatesResponse && this.fetchRatesResponse.base && this.fetchRatesResponse.rates) {
      return [
        EMPTY_OPTION,
        ...removeDuplicatesFromArray([
          this.fetchRatesResponse.base,
          ...Object.keys(this.fetchRatesResponse.rates),
        ]).sort(),
      ];
    }
    return [];
  }
}

export const appStore = new AppStore();

export const AppStoreContext = createContext<AppStore>(appStore);
