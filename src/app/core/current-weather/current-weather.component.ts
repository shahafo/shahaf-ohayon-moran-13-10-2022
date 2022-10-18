import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { removeFavorite, addFavorite } from 'src/app/favorites/state/favorites.actions';
import { ICity, TEL_AVIV } from 'src/app/models/city.model';
import { ICurrentWeather } from 'src/app/models/weather.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { setDefaultValue, updateCity } from '../state/core.actions';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  @Input() currentWeather: ICurrentWeather | null;
  @Input() currentCity: ICity;
  @Input() currentForecast: ICurrentWeather[] | null;

  today: string = new Date().toLocaleString();

  constructor(private store: Store<IAppState>, private _alerts: AlertsService) { }

  ngOnInit(): void {
  }

  checkFavoriteStatus(favorites: ICity[]) {
    return favorites.some(city => city.key == this.currentCity?.key);
  }

  toggleFavorite() {
    let shallowCopyCity: ICity = {
      name: this.currentCity.name,
      country: this.currentCity.country,
      key: this.currentCity.key,
      isDefault: this.currentCity.isDefault,
      isFavorite: !this.currentCity.isFavorite
    }
    !shallowCopyCity.isFavorite ? this.store.dispatch(removeFavorite({ cityKey: this.currentCity.key })) : this.store.dispatch(addFavorite({ city: shallowCopyCity }));
    this.store.dispatch(updateCity({ city: shallowCopyCity}));
  }

  toggleDefault() {
    if (this.currentCity.key == TEL_AVIV.key) {
      this._alerts.popAlert("Tel Aviv is the default of the defaults.");
      return;
    }
    let shallowCopyCity: ICity = {
      name: this.currentCity.name,
      country: this.currentCity.country,
      key: this.currentCity.key,
      isDefault: !this.currentCity.isDefault,
      isFavorite: this.currentCity.isFavorite
    }
    !shallowCopyCity.isDefault ? this.store.dispatch(setDefaultValue({ city: TEL_AVIV })) : this.store.dispatch(setDefaultValue({ city: shallowCopyCity }));
  }

}
