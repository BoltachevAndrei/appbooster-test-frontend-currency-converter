import { FetchRatesResponse } from "../interfaces";

export const fetchRates = (currencyCode: string): Promise<FetchRatesResponse> => {
  return fetch(`https://api.ratesapi.io/api/latest?base=${currencyCode}`)
    .then((response: Response) => response.json())
    .catch((error: Error) => console.log(error));
};
