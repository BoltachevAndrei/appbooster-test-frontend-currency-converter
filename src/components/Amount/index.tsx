import React, { ReactElement, useContext } from "react";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../../stores/app";

export const Amount = observer(
  (): ReactElement => {
    const { amount, setAmount } = useContext(AppStoreContext);
    const AMOUNT_REGEXP: RegExp = /^\d*$|^\d*\.$|^\d*\.\d{1,4}$/;

    const handleChange = (event: React.BaseSyntheticEvent) => {
      const isValidValue = AMOUNT_REGEXP.test(event.target.value);
      if (isValidValue) {
        setAmount(event.target.value);
      }
    };

    return <input type="text" data-testid="amount" value={amount} onChange={handleChange} />;
  }
);
