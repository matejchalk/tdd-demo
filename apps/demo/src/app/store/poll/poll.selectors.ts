import { createSelector } from '@ngrx/store';
import { PollState } from './poll.reducer';

const $pollState = (state: { poll: PollState }) => state.poll;

export const $poll = createSelector($pollState, ({ data }) => data);

export const $pollLoading = createSelector(
  $pollState,
  ({ loading }) => loading
);
