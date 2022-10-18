import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { RouterModule } from '@angular/router';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ValueTextComponent } from './value-text/value-text.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    CurrentWeatherComponent,
    ValueTextComponent,
    WeatherCardComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    RouterModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  exports: [
    HeaderComponent,
    WeatherCardComponent
  ]
})
export class CoreModule { }
