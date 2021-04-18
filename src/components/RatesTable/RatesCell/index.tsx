import React, { ReactElement } from "react";
import { RatesCellProps } from "./interfaces";
import { RatesCellStyled } from "./styled";

export const RatesCell = ({ children, ...restProps }: RatesCellProps): ReactElement => {
  return <RatesCellStyled {...restProps}>{children}</RatesCellStyled>;
};
