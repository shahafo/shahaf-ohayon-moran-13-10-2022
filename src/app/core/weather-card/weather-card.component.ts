import { Component, Input, OnInit } from '@angular/core';
import { ICurrentWeather } from 'src/app/models/weather.model';

@Component({
  selector: 'weatherCard',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input() data: ICurrentWeather;
  @Input() type: string;

  constructor() { }

  ngOnInit(): void {
  }

}
