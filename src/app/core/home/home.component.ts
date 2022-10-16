import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/app.state';
import { typing } from '../state/core.actions';
import { currentCity, getState } from '../state/core.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public fullState$ = this.store.select(getState); //debug

  cityControl: FormControl;
  isValid: boolean = false;

  constructor(private store: Store<IAppState>) {
    this.cityControl = new FormControl("");
  }

  ngOnInit(): void {
    this.listenToTyping();
    this.fullState$.subscribe(data => {
      console.log(data);
    })
  }

  listenToTyping() {
    this.cityControl.valueChanges.subscribe(q => {
      // console.log(q);
      this.store.dispatch(typing({ q: q }));
    })
  }

}
