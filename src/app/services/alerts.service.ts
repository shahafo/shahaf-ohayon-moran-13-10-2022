import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../core/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private _snackBar: MatSnackBar) { }

  public popAlert(message: string): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: message, duration: this.seconds(8)
    })
  }

  public popError(): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: "Oops! Something went wrong", duration: this.seconds(8)
    })
  }

  public closeAlert() {
    this._snackBar.dismiss();
  }

  private seconds(seconds: number): number {
    return seconds * 1000;
  }

}
