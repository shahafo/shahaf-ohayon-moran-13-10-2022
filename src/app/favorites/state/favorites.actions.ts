import { createAction, props } from "@ngrx/store";
import { ICity, ICityCard } from "src/app/models/city.model";

export const getFavorites = createAction('[Favorites] load favorites', props<{ cities: ICity[] }>());
export const fetchData = createAction('[Favorites] fetch data');
export const fetchDataSuccess = createAction('[Favorites] fetch data success', props<{ data: ICityCard[] }>());

export const addFavorite = createAction('[Favorites] addFavorite', props<{ city: ICity }>());
export const removeFavorite = createAction('[Favorites] removeFavorite', props<{ cityKey: string }>());

export const alertFavoriteChanged = createAction('[Favorites] alertFavoriteChanged');
