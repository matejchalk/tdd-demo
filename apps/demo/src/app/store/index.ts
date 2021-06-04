import { ActionReducerMap } from '@ngrx/store';
import { PollEffects } from './poll/poll.effects';
import { pollReducer, PollState } from './poll/poll.reducer';

export interface AppState {
  poll: PollState;
}

export const reducers: ActionReducerMap<AppState> = {
  poll: pollReducer,
};

export const effects = [PollEffects];
