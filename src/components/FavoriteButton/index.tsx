import React, { ReactElement, useCallback, useContext } from "react";
import { FavoriteButtonStyled } from "./styled";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../../stores/app";
import { FAVORITE_CURRENCY_CODE_LOCALSTORAGE } from "../../utils";

export const FavoriteButton = observer(
  (): ReactElement => {
    const { to, favoriteCurrency, setFavoriteCurrency } = useContext(AppStoreContext);

    const isDisabled = !to || to === favoriteCurrency;

    const handleFavoriteClick = useCallback(() => {
      setFavoriteCurrency(to);
      localStorage.setItem(FAVORITE_CURRENCY_CODE_LOCALSTORAGE, to);
    }, [to]);

    return (
      <FavoriteButtonStyled data-testid="favorite-button" onClick={handleFavoriteClick} disabled={isDisabled}>
        Set favorite
      </FavoriteButtonStyled>
    );
  }
);
