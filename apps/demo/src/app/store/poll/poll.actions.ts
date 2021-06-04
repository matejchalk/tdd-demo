import { createAction, props } from '@ngrx/store';
import { PollModel } from '../../api/models';
import { PollVoteArgs } from '../../api/types';

export const getPollRequestAction = createAction('[poll] getPollRequest');
export const getPollSuccessAction = createAction(
  '[Poll] getPollSuccess',
  props<{ data: PollModel }>()
);
export const getPollFailureAction = createAction(
  '[Poll] getPollFailure',
  props<{ error: unknown }>()
);

export const voteOnPollRequestAction = createAction(
  '[Poll] voteOnPollRequest',
  props<{ args: PollVoteArgs }>()
);
export const voteOnPollSuccessAction = createAction(
  '[Poll] voteOnPollSuccess',
  props<{ data: PollModel }>()
);
export const voteOnPollFailureAction = createAction(
  '[Poll] voteOnPollFailure',
  props<{ args: PollVoteArgs; error: unknown }>()
);
