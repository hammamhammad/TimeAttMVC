import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
      providedIn: 'root' // This makes the service available application-wide
    })
    export class LodingSpinnerService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  public show() {
    this.loadingSubject.next(true);
  }

  public hide() {
    this.loadingSubject.next(false);
  }
}
