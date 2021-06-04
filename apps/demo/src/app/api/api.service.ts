import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PollModel } from './models';
import { PollVoteArgs } from './types';

const MOCK_LATENCY = 500;

const MOCK_POLL: PollModel = {
  id: '42',
  title: 'How are you?',
  options: [
    { id: '123', label: 'Awesome!', userHasSelected: false, voteCount: 5 },
    { id: '456', label: 'Fine.', userHasSelected: false, voteCount: 10 },
    {
      id: '789',
      label: 'Not so good...',
      userHasSelected: false,
      voteCount: 3,
    },
  ],
  isExpired: false,
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getPoll(): Observable<PollModel> {
    return of(MOCK_POLL).pipe(delay(MOCK_LATENCY));
  }

  voteOnPoll(args: PollVoteArgs): Observable<PollModel> {
    return of({
      ...MOCK_POLL,
      options: MOCK_POLL.options.map((option) =>
        option.id === args.pollOptionId
          ? {
              ...option,
              voteCount: option.voteCount + 1,
              userHasSelected: true,
            }
          : option
      ),
    }).pipe(delay(MOCK_LATENCY));
  }
}
