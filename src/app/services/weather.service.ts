import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ICity, ICityCard, TEL_AVIV } from '../models/city.model';
import { ICurrentWeather } from '../models/weather.model';

const WEATHER_API = environment.weatherApi;
const CURRENT_WEATHER_URL = WEATHER_API.currentWeather;
const FORECAST_URL = WEATHER_API.forecast;
const AUTOCOMPLETE_URL = WEATHER_API.autocomplete;
const QUERIES = new HttpParams().append("apikey", environment.weatherApi.key);

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  getCityWeather(cityKey: string): Observable<ICurrentWeather> {
    return this._http.get(CURRENT_WEATHER_URL + cityKey, { params: QUERIES.append("details", true) }).pipe(
      map((data: any) => this.castWeatherToInterface(data[0]))
    );
  }

  getMultiCityWeather(cities: ICity[]): Observable<ICityCard>[] {
    let fork: Observable<ICityCard>[] = [];
    cities.forEach(city => {
      fork.push(this.getCityWeather(city.key).pipe(
        map((data: ICurrentWeather) => { return { city: city, weather: data } })
      ));
    })
    return fork;
  }

  getCityForecast(cityKey: string): Observable<ICurrentWeather[]> {
    return this._http.get(FORECAST_URL + cityKey, { params: QUERIES.append("metric", true) }).pipe(map((data: any) => this.castForecastToInterface(data)));
  }

  getCitySuggestions(q: string, favorites: ICity[], defaultValue: ICity): Observable<ICity[]> {
    if (q.length == 0) return of([]);
    return this._http.get<any[]>(AUTOCOMPLETE_URL, { params: QUERIES.append("q", q) })
      .pipe(
        filter(data => !!data),
        map((data: any[]) => data.map(x => this.castAutocompleteToInterface(x, favorites, defaultValue))));
  }

  getDefaultCity(favorites: ICity[]) {
    let storage = localStorage.getItem('default');
    return new Promise<ICity | null>((resolve) => {
      if (storage) {
        let defaultCity: ICity = JSON.parse(storage);
        defaultCity.isFavorite = favorites.some(city => city.key == defaultCity.key);
        resolve(defaultCity);
      }
      resolve(TEL_AVIV);
    })
  }

  saveDefaultCity(city: ICity) {
    return new Promise<void>((resolve) => {
      localStorage.setItem('default', JSON.stringify(city));
      resolve();
    })
  }

  castAutocompleteToInterface(data: any, favorites: ICity[], defaultValue: ICity): ICity {
    let isFavorite = favorites.some(city => city.key == data.Key);
    let isDefault = data.Key == defaultValue.key;
    return {
      name: data.LocalizedName, country: data.Country.LocalizedName, key: data.Key, isDefault: isDefault, isFavorite: isFavorite
    }
  }

  castWeatherToInterface(data: any): ICurrentWeather {
    return {
      max: {
        metric: data.TemperatureSummary.Past24HourRange.Maximum.Metric.Value,
        imperial: data.TemperatureSummary.Past24HourRange.Maximum.Imperial.Value,
      },
      min: {
        metric: data.TemperatureSummary.Past24HourRange.Minimum.Metric.Value,
        imperial: data.TemperatureSummary.Past24HourRange.Minimum.Imperial.Value,
      },
      humidity: data.RelativeHumidity,
      icon: this.handleIconString(data.WeatherIcon + ""),
      desc: data.WeatherText,
      day: data.LocalObservationDateTime
    }
  }

  castForecastToInterface(data: any) {
    let forecast: ICurrentWeather[] = [];
    data.DailyForecasts.forEach((day: any) => {
      forecast.push({
        day: day.Date,
        min: {
          metric: day.Temperature.Minimum.Value,
          imperial: this.celiusToFahrenheit(day.Temperature.Minimum.Value)
        },
        max: {
          metric: day.Temperature.Maximum.Value,
          imperial: this.celiusToFahrenheit(day.Temperature.Maximum.Value)
        },
        icon: this.handleIconString(day.Day.Icon + ""),
        desc: day.Day.IconPhrase,
        humidity: null
      })
    });

    return forecast;
  }

  handleIconString(icon: string): string {
    if (icon.length == 1) return "0" + icon;
    return icon;
  }

  celiusToFahrenheit(celius: number) {
    return Math.round(celius * 1.8 + 32);
  }
}
