import { ActionReducer, createReducer, MetaReducer, on } from "@ngrx/store";
import { ICity } from "src/app/models/weather.model";
import { environment } from "src/environments/environment";
import * as Actions from "./core.actions";

export interface CoreState {
  status: 'pending' | 'typing' | 'error' | 'complete';
  error: string | null;
  q: string | null;
  city: ICity;
  suggestions: ICity[];
}

const TEL_AVIV: ICity = {
  city: "Tel Aviv",
  country: "Israel",
  key: "215854"
}

export const initialState: CoreState = {
  error: null,
  status: 'pending',
  q: null,
  city: TEL_AVIV,
  suggestions: []
}

export const coreReducer = createReducer(
  initialState,
  on(Actions.typing, (state, { q }) => ({
    ...state,
    q: q,
    status: 'typing'
  })),
  on(Actions.fillAutocomplete, (state, { suggestions }) => ({
    ...state,
    suggestions: suggestions
  }))
);
