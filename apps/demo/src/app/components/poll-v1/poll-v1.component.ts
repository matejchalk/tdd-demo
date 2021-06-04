import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PollModel, PollOptionModel } from '../../api/models';
import { PollVoteArgs } from '../../api/types';
import { AppState } from '../../store';
import { voteOnPollRequestAction } from '../../store/poll/poll.actions';

@Component({
  selector: 'app-poll-v1',
  templateUrl: './poll-v1.component.html',
  styleUrls: ['./poll-v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollV1Component {
  @Input() poll: PollModel | null = null;

  constructor(private readonly store: Store<AppState>) {}

  get userHasVoted(): boolean {
    return (
      this.poll?.options.some(({ userHasSelected }) => userHasSelected) ?? false
    );
  }

  get userCanVote(): boolean {
    return !this.userHasVoted && !this.poll?.isExpired;
  }

  trackByPollOption(_: number, option: PollOptionModel): string {
    return option.id;
  }

  getPollPercentage(poll: PollModel, option: PollOptionModel): number {
    const totalVoteCount = poll.options.reduce(
      (acc, { voteCount }) => acc + voteCount,
      0
    );
    return Math.round((option.voteCount / totalVoteCount) * 100);
  }

  voteOnPoll(args: PollVoteArgs): void {
    this.store.dispatch(voteOnPollRequestAction({ args }));
  }
}
