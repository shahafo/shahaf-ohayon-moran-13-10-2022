import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, from, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { IAppState } from 'src/app/app.state';
import { AlertsService } from 'src/app/services/alerts.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { WeatherService } from 'src/app/services/weather.service';
import * as favoritesActions from './favorites.actions';
import { getFavorites } from './favorites.selectors';

@Injectable()
export class FavoritesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private _favoritesService: FavoritesService,
    private _weatherService: WeatherService,
    private _alerts: AlertsService
  ) { }

  saveFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoritesActions.addFavorite, favoritesActions.removeFavorite),
      withLatestFrom(this.store.select(getFavorites)),
      switchMap(([action, favorites]) => from(this._favoritesService.save(favorites)).pipe(
        tap(() => {
          if(action.type == "[Favorites] addFavorite") {
            this._alerts.popAlert(`${action.city.name} added to your favorites`);
            return;
          }
          this._alerts.popAlert("Removed from you favorites");
        })
      ))
    ),
    { dispatch: false }
  );

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoritesActions.fetchData),
      withLatestFrom(this.store.select(getFavorites)),
      switchMap(([action, favorites]) =>
        forkJoin(this._weatherService.getMultiCityWeather(favorites)).pipe(
          map((data) => favoritesActions.fetchDataSuccess({ data: data }))
        ))
    )
  );

}
