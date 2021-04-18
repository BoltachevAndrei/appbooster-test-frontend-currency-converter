import React, { ReactElement, useContext } from "react";
import { ResultStyled } from "./styled";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../../stores/app";

export const Result = observer(
  (): ReactElement => {
    const { result } = useContext(AppStoreContext);
    return <ResultStyled data-testid="result" disabled={true} value={result} />;
  }
);
