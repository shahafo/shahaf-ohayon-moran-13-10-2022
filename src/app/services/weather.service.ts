import { Injectable } from '@angular/core';
import { autoComplete } from '../mockups';
import { ICity } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  getCitySuggestions(): Promise<ICity[]> {
    let data: ICity[] = autoComplete.map(x => {
      return {
        city: x.LocalizedName, country: x.Country.LocalizedName, key: x.Key
      }
    });

    return new Promise<ICity[]>((resolve, reject) => {
      resolve(data);
    }
    )
  }
}
