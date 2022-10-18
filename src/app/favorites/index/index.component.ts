import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { fetchData } from '../state/favorites.actions';
import { getCardsData, getFavorites } from '../state/favorites.selectors';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  favorites$ = this.store.select(getFavorites);
  cards$ = this.store.select(getCardsData);

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(fetchData());
  }

}
