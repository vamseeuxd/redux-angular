import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
// import { incremented, store, decremented } from './store/store';

@Injectable({
  providedIn: 'root',
})
export class NgReduxService {
  /* private storeAction: BehaviorSubject<{ counter: number }> =
    new BehaviorSubject(store.getState().counter);
  constructor() {
    // Subscribe to store updates and map to a new observable
    store.subscribe(() => {
      this.storeAction.next(store.getState().counter);
    });
  }

  selectState(): Observable<number> {
    return this.storeAction.asObservable().pipe(map((state) => state.counter));
  }

  // Dispatch actions to the store
  increment() {
    store.dispatch(incremented());
  }

  decrement() {
    store.dispatch(decremented());
  } */
}
