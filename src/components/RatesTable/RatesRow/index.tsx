import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import { AppStoreContext } from "../../../stores/app";
import { RatesRowProps } from "./interfaces";
import { RatesRowStyled } from "./styled";
import { RatesCell } from "../RatesCell";

export const RatesRow = observer(
  ({ code, rate }: RatesRowProps): ReactElement => {
    const { favoriteCurrencies, setFavoriteCurrencies } = useContext(AppStoreContext);

    const isFavoriteCurrency = favoriteCurrencies.includes(code);

    const toggleCurrencyIsFavorite = () => {
      if (isFavoriteCurrency) {
        const index = favoriteCurrencies.indexOf(code);
        setFavoriteCurrencies([...favoriteCurrencies.slice(0, index), ...favoriteCurrencies.slice(index + 1)].sort());
      } else {
        setFavoriteCurrencies([...favoriteCurrencies, code].sort());
      }
    };

    const handleChange = (event: React.BaseSyntheticEvent) => {
      toggleCurrencyIsFavorite();
    };

    return (
      <RatesRowStyled data-testid="rates-row" isFavorite={isFavoriteCurrency}>
        <RatesCell data-testid="rates-code">{code}</RatesCell>
        <RatesCell data-testid="rates-rate">{rate}</RatesCell>
        <RatesCell>
          <input
            data-testid="rates-favorite"
            type="checkbox"
            name={code}
            value={code}
            onChange={handleChange}
            checked={isFavoriteCurrency}
          />
        </RatesCell>
      </RatesRowStyled>
    );
  }
);
