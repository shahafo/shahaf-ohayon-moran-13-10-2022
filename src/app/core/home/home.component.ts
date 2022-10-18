import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IAppState } from 'src/app/app.state';
import { getFavorites } from 'src/app/favorites/state/favorites.selectors';
import { ICity } from 'src/app/models/city.model';
import { getDefaultValue, loadCity, setCity, typing } from '../state/core.actions';
import { getCityForecast, getCurrentCity, getCurrentWeather, getState, getSuggestions } from '../state/core.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  SUBS: any[] = [];

  public city$ = this.store.select(getCurrentCity).pipe(map((city: ICity) => this.checkCityStatus(city)));
  public suggestions$ = this.store.select(getSuggestions);
  public currentWeather$ = this.store.select(getCurrentWeather);
  public currentForecast$ = this.store.select(getCityForecast);
  public favorites$ = this.store.select(getFavorites);

  cityInput: FormControl = new FormControl("");;
  isValid: boolean = false;

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.listenToTyping();
    this.SUBS.push(
      this.route.queryParams.subscribe((params: any) => {
        if (params.c) {
          this.store.dispatch(loadCity({ cityKey: params.c }));
          return;
        }
        this.store.dispatch(getDefaultValue());
      })
    );
  }

  listenToTyping() {
    this.SUBS.push(
      this.cityInput.valueChanges.subscribe(q => {
        this.store.dispatch(typing({ q: q }));
      })
    );
  }

  citySelected(city: ICity) {
    this.cityInput.setValue(city.name);
    this.store.dispatch(setCity({ city: city }));
  }

  checkCityStatus(city: ICity) {
    return city;
  }

  ngOnDestroy(): void {
      this.SUBS.forEach(subscription => subscription.unsubscribe());
  }
}
