import React, { ReactElement, useContext } from "react";
import { CurrencyPickerProps } from "./interfaces";
import { CurrencySelectStyled, CurrencyOptionStyled } from "./styled";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../../stores/app";

export const CurrencyPicker = observer(
  ({ name }: CurrencyPickerProps): ReactElement => {
    const appStore = useContext(AppStoreContext);
    const { setFrom, setTo, currencyCodes } = appStore;
    const value = appStore[name];

    const handleChange = (event: React.BaseSyntheticEvent) => {
      switch (name) {
        case "from":
          setFrom(event.target.value);
          break;
        case "to":
          setTo(event.target.value);
          break;
        default:
          break;
      }
    };

    return (
      <CurrencySelectStyled data-testid="picker-select" value={value} onChange={handleChange}>
        {currencyCodes.map((code) => {
          return (
            <CurrencyOptionStyled data-testid="picker-option" key={code} value={code}>
              {code}
            </CurrencyOptionStyled>
          );
        })}
      </CurrencySelectStyled>
    );
  }
);
