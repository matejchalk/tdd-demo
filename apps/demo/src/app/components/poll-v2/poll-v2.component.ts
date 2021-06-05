import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { PollModel } from '../../api/models';
import { PollVoteArgs } from '../../api/types';
import {
  convertPollToViewModel,
  PollOptionViewModel,
  PollViewModel,
} from '../../poll-utils';
import { AppState } from '../../store';
import { voteOnPollRequestAction } from '../../store/poll/poll.actions';

@Component({
  selector: 'app-poll-v2',
  templateUrl: './poll-v2.component.html',
  styleUrls: ['./poll-v2.component.scss'],
})
export class PollV2Component {
  private readonly $poll = new BehaviorSubject<PollViewModel | null>(null);
  readonly poll$ = this.$poll.asObservable();

  @Input() set poll(poll: PollModel | null) {
    this.$poll.next(poll && convertPollToViewModel(poll));
  }

  constructor(private readonly store: Store<AppState>) {}

  trackByPollOption(_: number, option: PollOptionViewModel): string {
    return option.id;
  }

  voteOnPoll(args: PollVoteArgs): void {
    this.store.dispatch(voteOnPollRequestAction({ args }));
  }
}
