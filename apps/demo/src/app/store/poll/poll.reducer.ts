import { Action, createReducer, on } from '@ngrx/store';
import { PollModel } from '../../api/models';
import {
  getPollFailureAction,
  getPollRequestAction,
  getPollSuccessAction,
  voteOnPollFailureAction,
  voteOnPollRequestAction,
  voteOnPollSuccessAction,
} from './poll.actions';

export interface PollState {
  data: PollModel | null;
  loading: boolean;
}

const initialState: PollState = {
  data: null,
  loading: false,
};

export const pollReducer = createReducer(
  initialState,

  on(getPollRequestAction, (state) => ({
    ...state,
    loading: true,
  })),
  on(getPollSuccessAction, (state, action) => ({
    ...state,
    data: action.data,
    loading: false,
  })),
  on(getPollFailureAction, (state) => ({
    ...state,
    loading: false,
  })),

  on(voteOnPollRequestAction, (state, action) => ({
    ...state,
    // optimistic update
    data: state.data && {
      ...state.data,
      options: state.data.options.map((option) =>
        option.id === action.args.pollOptionId
          ? {
              ...option,
              voteCount: option.voteCount + 1,
              userHasSelected: true,
            }
          : option
      ),
    },
    loading: true,
  })),
  on(voteOnPollSuccessAction, (state, action) => ({
    ...state,
    data: action.data,
    loading: false,
  })),
  on(voteOnPollFailureAction, (state, action) => ({
    ...state,
    // revert optimistic update
    data: state.data && {
      ...state.data,
      options: state.data.options.map((option) =>
        option.id === action.args.pollOptionId
          ? {
              ...option,
              voteCount: option.voteCount - 1,
              userHasSelected: false,
            }
          : option
      ),
    },
    loading: true,
  }))
);

export function reducer(state: PollState | undefined, action: Action) {
  return pollReducer(state, action);
}
