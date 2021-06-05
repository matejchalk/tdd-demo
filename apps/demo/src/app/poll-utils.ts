import { PollModel } from './api/models';

export interface PollViewModel {
  id: string;
  title: string;
  options: PollOptionViewModel[];
  userCanVote: boolean;
}

export interface PollOptionViewModel {
  id: string;
  label: string;
  userHasSelected: boolean;
  votePercentage: number;
}

export function convertPollToViewModel(poll: PollModel): PollViewModel {
  const totalVoteCount = poll.options.reduce(
    (acc, { voteCount }) => acc + voteCount,
    0
  );
  const userHasVoted =
    poll?.options.some(({ userHasSelected }) => userHasSelected) ?? false;
  const options = poll.options.map(
    (option): PollOptionViewModel => ({
      id: option.id,
      label: option.label,
      userHasSelected: option.userHasSelected,
      votePercentage:
        totalVoteCount === 0
          ? 0
          : Math.round((option.voteCount / totalVoteCount) * 100),
    })
  );
  const totalPercentage = options.reduce(
    (acc, { votePercentage }) => acc + votePercentage,
    0
  );
  if (totalVoteCount > 0) {
    options[0].votePercentage -= totalPercentage - 100;
  }
  return {
    id: poll.id,
    title: poll.title,
    userCanVote: !userHasVoted && !poll?.isExpired,
    options,
  };
}
