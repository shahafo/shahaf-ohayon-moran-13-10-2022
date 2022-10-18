import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core/core.module';
import { coreReducer } from './core/state/core.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './core/state/core.effects';
import { favoritesReducer } from './favorites/state/favorites.reducers';
import { FavoritesEffects } from './favorites/state/favorites.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    StoreModule.forRoot({ core: coreReducer, favorites: favoritesReducer }),
    EffectsModule.forRoot([CoreEffects, FavoritesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
