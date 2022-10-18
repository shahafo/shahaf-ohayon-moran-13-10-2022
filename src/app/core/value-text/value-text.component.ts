import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { ITemperature } from 'src/app/models/weather.model';
import { isImperial } from '../state/core.selectors';

@Component({
  selector: 'valueText',
  templateUrl: './value-text.component.html',
  styleUrls: ['./value-text.component.scss']
})
export class ValueTextComponent implements OnInit {

  @Input() value: ITemperature;
  @Input() text: string;
  @Input() simpleValue: string | number | null;

  isImperial$ = this.store.select(isImperial);

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
  }

}
