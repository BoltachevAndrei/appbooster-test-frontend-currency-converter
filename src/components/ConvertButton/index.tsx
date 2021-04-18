import React, { ReactElement, useCallback, useContext } from "react";
import { ConvertButtonStyled } from "./styled";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../../stores/app";

export const ConvertButton = observer(
  (): ReactElement => {
    const { amount, isFetchingData, from, to, setResult, fetchRatesResponse } = useContext(AppStoreContext);

    const handleConvertButtonClick = useCallback(() => {
      const rate = fetchRatesResponse?.rates[from];
      if (rate) {
        setResult((parseFloat(amount) / rate).toFixed(4));
      }
    }, [amount, from, fetchRatesResponse]);

    const isDisabled = isFetchingData || !from || !to;

    return (
      <ConvertButtonStyled data-testid="convert-button" onClick={handleConvertButtonClick} disabled={isDisabled}>
        Convert
      </ConvertButtonStyled>
    );
  }
);
