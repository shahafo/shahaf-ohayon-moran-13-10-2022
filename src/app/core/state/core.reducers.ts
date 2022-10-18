import { createReducer, on } from "@ngrx/store";
import { ICity, TEL_AVIV } from "src/app/models/city.model";
import { ICurrentWeather } from "src/app/models/weather.model";
import * as Actions from "./core.actions";

export interface CoreState {
  loading: string[];
  error: string | null;
  q: string;
  city: ICity;
  suggestions: ICity[];
  currentWeather: ICurrentWeather | null;
  forecast: ICurrentWeather[] | null;
  isImperial: boolean;
  default: ICity | null;
}

export const initialState: CoreState = {
  loading: ['main'],
  error: null,
  q: '',
  city: TEL_AVIV,
  suggestions: [],
  currentWeather: null,
  forecast: null,
  isImperial: false,
  default: null
}

export const coreReducer = createReducer(
  initialState,
  on(Actions.loadDefaultValue, (state, { city }) => ({
    ...state,
    default: city,
    loading: state.loading.filter(x => x != 'main'),
    city: city
  })),
  on(Actions.typing, (state, { q }) => ({
    ...state,
    q: q,
    loading: [...state.loading, 'suggestions'].filter(onlyUnique)
  })),
  on(Actions.fetchSuggustionsSuccess, (state, { suggestions }) => ({
    ...state,
    suggestions: suggestions,
    loading: state.loading.filter(x => x != 'suggestions')
  })),
  on(Actions.setCity, (state, { city }) => ({
    ...state,
    city: city,
    suggestions: []
  })),
  on(Actions.fetchCurrentWeatherSuccess, (state, { currentWeather }) => ({
    ...state,
    currentWeather: currentWeather,
    loading: state.loading.filter(x => x != 'currentWeather')
  })),
  on(Actions.fetchForecastSuccess, (state, { forecast: currentForecast }) => ({
    ...state,
    forecast: currentForecast,
    loading: state.loading.filter(x => x != 'forecast')
  })),
  on(Actions.toggleUnit, (state, { isImperial }) => ({
    ...state,
    isImperial: isImperial
  })),
  on(Actions.updateCity, (state, { city }) => ({
    ...state,
    city: city
  })),
  on(Actions.setDefaultValue, (state, { city }) => ({
    ...state,
    default: city,
    city: city
  }))
);

const onlyUnique = (value: any, index: number, self: any) => {
  return self.indexOf(value) === index;
}
