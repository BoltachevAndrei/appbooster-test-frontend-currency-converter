import React, { ReactElement } from "react";
import { CurrencyPicker } from "../CurrencyPicker";
import { Amount } from "../Amount";
import { FavoriteButton } from "../FavoriteButton";
import { ConvertButton } from "../ConvertButton";
import { Result } from "../Result";
import { SwapCurrenciesButton } from "../SwapCurrenciesButton";

const Converter = (): ReactElement => {
  return (
    <>
      <Amount />
      <CurrencyPicker name="from" />
      <SwapCurrenciesButton />
      <CurrencyPicker name="to" />
      <FavoriteButton />
      <ConvertButton />
      <Result />
    </>
  );
};

export default Converter;
