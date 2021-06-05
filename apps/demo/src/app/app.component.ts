import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PollVoteArgs } from './api/types';
import { AppState } from './store';
import {
  getPollRequestAction,
  voteOnPollRequestAction,
} from './store/poll/poll.actions';
import { $poll, $pollVM } from './store/poll/poll.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly poll$ = this.store.select($poll);
  readonly pollVM$ = this.store.select($pollVM);

  constructor(private readonly store: Store<AppState>) {
    store.dispatch(getPollRequestAction());
  }

  handleVote(args: PollVoteArgs): void {
    this.store.dispatch(voteOnPollRequestAction({ args }));
  }
}
