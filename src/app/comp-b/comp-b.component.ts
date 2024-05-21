import { Component } from '@angular/core';
import { ReduxService } from '../store/redux-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-comp-b',
  templateUrl: './comp-b.component.html',
  styleUrls: ['./comp-b.component.scss'],
})
export class CompBComponent {
  service = ReduxService.getInstance();
  users: BehaviorSubject<any> = new BehaviorSubject([]);
  ngOnInit() {
    this.service.subscribe('users', (state: { users: any[] }) => {
      this.users.next(state?.users || []);
      console.log(state?.users);
    });
  }
  deleteAll() {
    this.service.dispatch(this.service.getAction('users', 'deleteAll')());
  }
}
