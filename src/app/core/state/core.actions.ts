import { createAction, props } from "@ngrx/store";
import { ICity } from "src/app/models/city.model";
import { ICurrentWeather } from "src/app/models/weather.model";

export const getDefaultValue = createAction('[Home] get default value');
export const setDefaultValue = createAction('[Home] set default value success', props<{ city: ICity }>());
export const loadDefaultValue = createAction('[Home] load default value success', props<{ city: ICity }>());

export const typing = createAction('[Home] typing', props<{ q: string }>());
export const fetchSuggustionsSuccess = createAction('[Home] fetch suggestions success', props<{ suggestions: ICity[] }>());

export const setCity = createAction('[Home] set city', props<{ city: ICity }>());
export const fetchCurrentWeatherSuccess = createAction('[Home] fetch current weather', props<{ currentWeather: ICurrentWeather }>());
export const fetchForecastSuccess = createAction('[Home] fetch forecast success', props<{ forecast: ICurrentWeather[] }>());

export const toggleUnit = createAction('[Home] toggleUnits', props<{ isImperial: boolean }>());
export const loadCity = createAction('[Home] loadCity', props<{ cityKey: string }>());
export const updateCity = createAction('[Home] updateCity', props<{ city: ICity }>());
export const savedDefault = createAction('[Home] savedDefault');
export const errorMessage = createAction('[Home] error');
