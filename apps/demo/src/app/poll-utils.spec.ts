import { PollModel } from './api/models';
import { convertPollToViewModel, PollViewModel } from './poll-utils';

describe('convertPollToViewModel', () => {
  test('should convert poll to view model', () => {
    expect(
      convertPollToViewModel({
        id: '42',
        title: 'Yes or no?',
        options: [
          { id: '1', label: 'Yes!', voteCount: 45, userHasSelected: true },
          { id: '2', label: 'No.', voteCount: 15, userHasSelected: false },
        ],
        isExpired: false,
      })
    ).toEqual({
      id: '42',
      title: 'Yes or no?',
      options: [
        { id: '1', label: 'Yes!', votePercentage: 75, userHasSelected: true },
        { id: '2', label: 'No.', votePercentage: 25, userHasSelected: false },
      ],
      userCanVote: false,
    } as PollViewModel);
  });

  test('should allow user to vote if not voted already and poll not expired', () => {
    expect(
      convertPollToViewModel({
        options: [{ userHasSelected: false }, { userHasSelected: false }],
        isExpired: false,
      } as PollModel)
    ).toMatchObject({
      userCanVote: true,
    } as PollViewModel);
  });

  test('should not allow user to vote if they voted already', () => {
    expect(
      convertPollToViewModel({
        options: [{ userHasSelected: false }, { userHasSelected: true }],
        isExpired: false,
      } as PollModel)
    ).toMatchObject({
      userCanVote: false,
    } as PollViewModel);
  });

  test('should not allow user to vote if poll expired', () => {
    expect(
      convertPollToViewModel({
        options: [{ userHasSelected: false }, { userHasSelected: false }],
        isExpired: true,
      } as PollModel)
    ).toMatchObject({
      userCanVote: false,
    } as PollViewModel);
  });

  test('should compute rounded percentages from vote count', () => {
    expect(
      convertPollToViewModel({
        options: [{ voteCount: 123 }, { voteCount: 45 }, { voteCount: 6 }],
      } as PollModel)
    ).toMatchObject({
      options: [
        { votePercentage: 71 },
        { votePercentage: 26 },
        { votePercentage: 3 },
      ],
    } as PollViewModel);
  });

  test('should ensure rounded percentages add up to 100%', () => {
    expect(
      convertPollToViewModel({
        options: [{ voteCount: 5 }, { voteCount: 10 }, { voteCount: 3 }],
      } as PollModel)
    ).toMatchObject({
      options: [
        { votePercentage: 27 },
        { votePercentage: 56 },
        { votePercentage: 17 },
      ],
    } as PollViewModel);
  });

  test('should handle poll without any votes', () => {
    expect(
      convertPollToViewModel({
        options: [{ voteCount: 0 }, { voteCount: 0 }],
      } as PollModel)
    ).toMatchObject({
      options: [{ votePercentage: 0 }, { votePercentage: 0 }],
    } as PollViewModel);
  });
});
