import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { action } from '@storybook/addon-actions';
import { number, select, text } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { PollViewModel } from '../../poll-utils';
import { PollV3Component } from './poll-v3.component';

@NgModule({
  declarations: [PollV3Component],
  imports: [CommonModule],
  exports: [PollV3Component],
})
class PollV3Module {}

export default {
  title: 'PollV3Component',
  component: PollV3Component,
  decorators: [
    moduleMetadata({
      imports: [PollV3Module],
    }),
  ],
} as Meta;

export const userNotVoted: Story = () => ({
  props: {
    poll: {
      id: '42',
      title: text('Poll title', 'How are you?'),
      options: [
        {
          id: '123',
          label: text('Option #1 label', 'Awesome!'),
          userHasSelected: false,
          votePercentage: 27,
        },
        {
          id: '456',
          label: text('Option #2 label', 'Fine.'),
          userHasSelected: false,
          votePercentage: 56,
        },
        {
          id: '789',
          label: text('Option #3 label', 'Not so good...'),
          userHasSelected: false,
          votePercentage: 17,
        },
      ],
      userCanVote: true,
    } as PollViewModel,
    vote: action('vote'),
  },
});

export const userVoted: Story = () => {
  const selectedOption = select(
    'Selected option',
    {
      'Option #1': '123',
      'Option #2': '456',
      'Option #3': '789',
    },
    '456'
  );
  return {
    props: {
      poll: {
        id: '42',
        title: 'How are you?',
        options: [
          {
            id: '123',
            label: 'Awesome!',
            userHasSelected: selectedOption === '123',
            votePercentage: number('Option #1 vote percentage', 27, {
              min: 0,
              max: 100,
              step: 1,
            }),
          },
          {
            id: '456',
            label: 'Fine.',
            userHasSelected: selectedOption === '456',
            votePercentage: number('Option #2 vote percentage', 56, {
              min: 0,
              max: 100,
              step: 1,
            }),
          },
          {
            id: '789',
            label: 'Not so good...',
            userHasSelected: selectedOption === '789',
            votePercentage: number('Option #3 vote percentage', 17, {
              min: 0,
              max: 100,
              step: 1,
            }),
          },
        ],
        userCanVote: false,
      } as PollViewModel,
      vote: action('vote'),
    },
  };
};

export const expired: Story = () => ({
  props: {
    poll: {
      id: '42',
      title: 'How are you?',
      options: [
        {
          id: '123',
          label: 'Awesome!',
          userHasSelected: false,
          votePercentage: number('Option #1 vote percentage', 27, {
            min: 0,
            max: 100,
            step: 1,
          }),
        },
        {
          id: '456',
          label: 'Fine.',
          userHasSelected: false,
          votePercentage: number('Option #2 vote percentage', 56, {
            min: 0,
            max: 100,
            step: 1,
          }),
        },
        {
          id: '789',
          label: 'Not so good...',
          userHasSelected: false,
          votePercentage: number('Option #3 vote percentage', 17, {
            min: 0,
            max: 100,
            step: 1,
          }),
        },
      ],
      userCanVote: false,
    } as PollViewModel,
    vote: action('vote'),
  },
});
