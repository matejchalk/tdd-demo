import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PollVoteArgs } from '../../api/types';
import { PollOptionViewModel, PollViewModel } from '../../poll-utils';

@Component({
  selector: 'app-poll-v3',
  templateUrl: './poll-v3.component.html',
  styleUrls: ['./poll-v3.component.scss'],
})
export class PollV3Component {
  @Input() poll: PollViewModel | null = null;
  @Output() vote = new EventEmitter<PollVoteArgs>();

  trackByPollOption(_: number, option: PollOptionViewModel): string {
    return option.id;
  }
}
