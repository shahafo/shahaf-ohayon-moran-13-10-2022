import { createReducer, on } from "@ngrx/store";
import { ICity, ICityCard } from "src/app/models/city.model";
import * as Actions from "./favorites.actions";


export interface FavoritesState {
  cities: ICity[];
  cards: ICityCard[];
}

export const initialState: FavoritesState = {
  cities: [],
  cards: []
}

export const favoritesReducer = createReducer(
  initialState,
  on(Actions.addFavorite, (state, { city }) => ({
    ...state,
    cities: [...state.cities, city],
    city: city
  })),
  on(Actions.removeFavorite, (state, { cityKey }) => ({
    ...state,
    cities: state.cities.filter(city => city.key != cityKey),
    cards: state.cards.filter(card => card.city.key != cityKey)
  })),
  on(Actions.getFavorites, (state, { cities }) => ({
    ...state,
    cities: cities
  })),
  on(Actions.fetchDataSuccess, (state, { data }) => ({
    ...state,
    cards: data
  }))
)
