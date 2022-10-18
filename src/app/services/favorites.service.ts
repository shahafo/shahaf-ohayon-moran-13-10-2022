import { Injectable } from '@angular/core';
import { ICity } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  save(favorites: ICity[]) {
    return new Promise<void>((resolve) => {
      localStorage.setItem('favorites', JSON.stringify(favorites));
      resolve();
    })
  };

  load(): ICity[] {
    let storage = localStorage.getItem('favorites');
    if (storage) return JSON.parse(storage);
    return [];
  }
}
