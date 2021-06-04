export type PollModel = {
  id: string;
  title: string;
  options: PollOptionModel[];
  isExpired: boolean;
};

export type PollOptionModel = {
  id: string;
  label: string;
  voteCount: number;
  userHasSelected: boolean;
};
