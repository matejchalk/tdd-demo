import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';
import {
  getPollFailureAction,
  getPollRequestAction,
  getPollSuccessAction,
  voteOnPollFailureAction,
  voteOnPollRequestAction,
  voteOnPollSuccessAction,
} from './poll.actions';

@Injectable()
export class PollEffects {
  readonly loadPoll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPollRequestAction),
      switchMap(() =>
        this.apiService.getPoll().pipe(
          map((data) => getPollSuccessAction({ data })),
          catchError((error) => of(getPollFailureAction({ error })))
        )
      )
    )
  );

  readonly voteOnPoll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(voteOnPollRequestAction),
      switchMap(({ args }) =>
        this.apiService.voteOnPoll(args).pipe(
          map((data) => voteOnPollSuccessAction({ data })),
          catchError((error) => of(voteOnPollFailureAction({ args, error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiService
  ) {}
}
