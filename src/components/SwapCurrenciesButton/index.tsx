import React, { ReactElement, useCallback, useContext } from "react";
import { SwapCurrenciesButtonStyled } from "./styled";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../../stores/app";

export const SwapCurrenciesButton = observer(
  (): ReactElement => {
    const { from, to, setFrom, setTo } = useContext(AppStoreContext);

    const handleSwapCurrencies = useCallback(() => {
      const temp = from;
      setFrom(to);
      setTo(temp);
    }, [from, to]);

    return (
      <SwapCurrenciesButtonStyled data-testid="swap-button" onClick={handleSwapCurrencies}>
        Swap
      </SwapCurrenciesButtonStyled>
    );
  }
);
