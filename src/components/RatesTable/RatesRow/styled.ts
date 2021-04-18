import styled from "styled-components";
import { RatesRowStyledProps } from "./interfaces";

export const RatesRowStyled = styled.tr<RatesRowStyledProps>`
  background-color: ${(props) => (props.isFavorite ? "lightblue" : "white")};
`;
