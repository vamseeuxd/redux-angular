import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ReduxService } from './store/redux-service';
import { counterSlice, counterSliceOption } from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  service = ReduxService.getInstance();
  counterAction: Subject<number> = new Subject();
  counter$ = this.counterAction.asObservable();
  ngOnInit() {
    this.service.configSlicesOptions([counterSliceOption]);
    this.service.subscribe('counter', (state: { counter: number }) => {
      this.counterAction.next(state.counter);
    });
  }

  increment() {
    this.service.dispatch(this.service.getAction('counter','incremented')());
  }

  decrement() {
    this.service.dispatch(this.service.getAction('counter','decremented')());
  }
}
