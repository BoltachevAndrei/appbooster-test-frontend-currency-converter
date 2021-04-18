export interface FetchRatesResponse {
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

export type CurrencyCode = string;
