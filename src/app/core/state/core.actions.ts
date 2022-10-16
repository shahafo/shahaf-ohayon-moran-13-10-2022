import { createAction, props } from "@ngrx/store";
import { ICity } from "src/app/models/weather.model";

export const typing = createAction('[Home] typing', props<{ q: string }>());
export const fillAutocomplete = createAction('[Home] fillAutocomplete', props<{ suggestions: ICity[] }>());
export const chooseCity = createAction('[Home] chooseCity', props<{ key: string, name: string }>());
