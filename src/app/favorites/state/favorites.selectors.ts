import { createSelector } from "@ngrx/store";
import { IAppState } from "src/app/app.state";
import { FavoritesState } from "./favorites.reducers";

export const selectFavorites = (state: IAppState) => state.favorites;

export const getFavorites = createSelector(
  selectFavorites,
  (state: FavoritesState) => state.cities
)

export const getCardsData = createSelector(
  selectFavorites,
  (state: FavoritesState) => state.cards
)
