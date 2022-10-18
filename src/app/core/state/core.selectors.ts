import { createSelector } from "@ngrx/store";
import { IAppState } from "src/app/app.state";
import { CoreState } from "./core.reducers";

export const selectCore = (state: IAppState) => state.core;

export const getCurrentCity = createSelector(
  selectCore,
  (state: CoreState) => state.city
);

export const getCurrentQuery = createSelector(
  selectCore,
  (state: CoreState) => state.q
)

export const getSuggestions = createSelector(
  selectCore,
  (state: CoreState) => state.suggestions
)

export const getCurrentWeather = createSelector(
  selectCore,
  (state: CoreState) => state.currentWeather
)

export const getCityForecast = createSelector(
  selectCore,
  (state: CoreState) => state.forecast
)

export const isImperial = createSelector(
  selectCore,
  (state: CoreState) => state.isImperial
)

export const getDefault = createSelector(
  selectCore,
  (state: CoreState) => state.default
)

export const getState = createSelector(
  selectCore,
  (state: CoreState) => state
)
