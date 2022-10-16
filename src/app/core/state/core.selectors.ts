import { createSelector } from "@ngrx/store";
import { IAppState } from "src/app/app.state";
import { CoreState } from "./core.reducers";

export const selectCore = (state: IAppState) => state.core;
export const currentCity = createSelector(
  selectCore,
  (state: CoreState) => state.city
);

export const getState = createSelector(
  selectCore,
  (state: CoreState) => state
)
