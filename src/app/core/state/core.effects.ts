import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { switchMap, map, withLatestFrom, tap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { WeatherService } from 'src/app/services/weather.service';
import { getDefaultValue, setCity, typing, setDefaultValue, fetchCurrentWeatherSuccess, fetchSuggustionsSuccess, fetchForecastSuccess, savedDefault, loadDefaultValue, loadCity, errorMessage } from './core.actions';
import { getCurrentCity, getCurrentQuery, getDefault } from './core.selectors';
import { TEL_AVIV } from 'src/app/models/city.model';
import { getFavorites } from 'src/app/favorites/state/favorites.selectors';
import { AlertsService } from 'src/app/services/alerts.service';

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private _weatherService: WeatherService,
    private _alerts: AlertsService
  ) { }

  loadDefaultValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDefaultValue),
      withLatestFrom(this.store.select(getFavorites)),
      switchMap(([action, favorites]) =>
        from(this._weatherService.getDefaultCity(favorites)).pipe(
          map((data) => {
            return loadDefaultValue({ city: data ? data : TEL_AVIV });
          }),
          catchError(() => of(errorMessage()))
        ))
    )
  );

  fetchSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(typing),
      withLatestFrom(this.store.select(getCurrentQuery), this.store.select(getFavorites), this.store.select(getDefault)),
      switchMap(([action, q, favorites, defaultValue]) =>
        from(this._weatherService.getCitySuggestions(q, favorites, defaultValue ? defaultValue : TEL_AVIV)).pipe(
          map((data) => fetchSuggustionsSuccess({ suggestions: data ? data : [] })),
          catchError(() => of(errorMessage()))
        )
      )
    )
  );

  setCurrentWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCity, loadDefaultValue),
      withLatestFrom(this.store.select(getCurrentCity)),
      switchMap(([action, city]) =>
        from(this._weatherService.getCityWeather(city.key)).pipe(
          map((data) => fetchCurrentWeatherSuccess({ currentWeather: data })),
          catchError((err) => of(errorMessage()))
        ))
    )
  );

  setCurrentForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCity, loadDefaultValue),
      withLatestFrom(this.store.select(getCurrentCity)),
      switchMap(([action, city]) =>
        from(this._weatherService.getCityForecast(city.key)).pipe(
          map((data) => fetchForecastSuccess({ forecast: data })),
          catchError((err) => of(errorMessage()))
        ))
    )
  );

  saveDefaultCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setDefaultValue),
      switchMap(action => from(this._weatherService.saveDefaultCity(action.city)).pipe(
        tap(() => this._alerts.popAlert(`${action.city.name} is now your default city`)),
        catchError(() => of(errorMessage()))
      ))
    ),
    { dispatch: false }
  )

  loadCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCity),
      withLatestFrom(this.store.select(getFavorites)),
      switchMap(([action, favorites]) =>
        of(action).pipe(
          map(() => setCity({ city: favorites.filter(city => city.key == action.cityKey)[0] })),
          catchError(() => of(errorMessage()))
        )
      ))
  );

  errorMessage$ = createEffect(() =>
  this.actions$.pipe(
    ofType(errorMessage),
    tap(() => this._alerts.popError())
  ))
}
