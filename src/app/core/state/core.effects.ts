import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { WeatherService } from 'src/app/services/weather.service';
import { fillAutocomplete, typing } from './core.actions';

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private _weatherService: WeatherService
  ) {}

  findSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(typing),
      switchMap(() =>
        from(this._weatherService.getCitySuggestions()).pipe(
          map((data) => fillAutocomplete({ suggestions: data})),
          // catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );
}
