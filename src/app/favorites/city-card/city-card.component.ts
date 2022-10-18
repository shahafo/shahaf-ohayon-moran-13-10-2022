import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { setDefaultValue, getDefaultValue } from 'src/app/core/state/core.actions';
import { getDefault } from 'src/app/core/state/core.selectors';
import { ICityCard, TEL_AVIV } from 'src/app/models/city.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { removeFavorite } from '../state/favorites.actions';

@Component({
  selector: 'cityCard',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnInit, OnDestroy {

  @Input() data: ICityCard;
  SUBS: any[] = [];
  isDefault: boolean = false;

  constructor(private store: Store<IAppState>, private _alerts: AlertsService) { }

  ngOnInit(): void {
    this.store.dispatch(getDefaultValue());
    this.SUBS.push(
      this.store.select(getDefault).subscribe(defaultValue => {
        this.isDefault = defaultValue?.key == this.data.city.key;
      })
    );
  }

  removeFavorite() {
    this.store.dispatch(removeFavorite({ cityKey: this.data.city.key }));
  }

  toggleDefault() {
    this.isDefault ? this.store.dispatch(setDefaultValue({ city: TEL_AVIV })) : this.store.dispatch(setDefaultValue({ city: this.data.city ? this.data.city : TEL_AVIV }));
    if (this.data.city.key == TEL_AVIV.key) this._alerts.popAlert("Tel Aviv is the default of the defaults.");
  }

  ngOnDestroy(): void {
      this.SUBS.forEach(subscription => subscription.unsubscribe());
  }
}
