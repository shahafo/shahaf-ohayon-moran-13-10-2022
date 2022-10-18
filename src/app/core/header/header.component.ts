import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { getFavorites } from 'src/app/favorites/state/favorites.actions';
import { FavoritesService } from 'src/app/services/favorites.service';
import { toggleUnit } from '../state/core.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isImperial: FormControl = new FormControl(false);

  constructor(private store: Store<IAppState>, private _favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.store.dispatch(getFavorites({ cities: this._favoritesService.load() }));
    this.isImperial.valueChanges.subscribe((value: boolean) => {
      this.store.dispatch(toggleUnit({ isImperial: value}))
    })
  }

}
