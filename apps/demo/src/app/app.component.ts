import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { getPollRequestAction } from './store/poll/poll.actions';
import { $poll } from './store/poll/poll.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly poll$ = this.store.select($poll);

  constructor(private readonly store: Store<AppState>) {
    store.dispatch(getPollRequestAction());
  }
}
