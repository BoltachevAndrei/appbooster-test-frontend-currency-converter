import React, { ReactElement, useContext } from "react";
import { RatesTableStyled } from "./styled";
import { CurrencyPicker } from "../CurrencyPicker";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../../stores/app";
import { RatesRow } from "./RatesRow";

const RatesTable = observer(
  (): ReactElement => {
    const sortFunction = (a: [string, number], b: [string, number]): number => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    };

    const { fetchRatesResponse, favoriteCurrencies } = useContext(AppStoreContext);
    const rates = fetchRatesResponse?.rates && Object.entries(fetchRatesResponse?.rates).sort(sortFunction);

    const favoriteCurrenciesRates = rates && rates.filter(([code]) => favoriteCurrencies.includes(code));
    const notFavoriteCurrenciesRates = rates && rates.filter(([code]) => !favoriteCurrencies.includes(code));

    const allRates = favoriteCurrenciesRates &&
      notFavoriteCurrenciesRates && [...favoriteCurrenciesRates, ...notFavoriteCurrenciesRates];

    return (
      <>
        <CurrencyPicker name="to" />
        <RatesTableStyled>
          <thead>
            <tr>
              <th>Code</th>
              <th>Rate</th>
              <th>Favorite Currency</th>
            </tr>
            {allRates &&
              allRates.map(([code, rate]) => {
                return <RatesRow key={code} code={code} rate={rate} />;
              })}
          </thead>
        </RatesTableStyled>
      </>
    );
  }
);

export default RatesTable;
