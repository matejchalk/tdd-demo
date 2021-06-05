import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { number, select, text } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { PollModel } from '../../api/models';
import { PollV2Component } from './poll-v2.component';

@NgModule({
  declarations: [PollV2Component],
  imports: [CommonModule],
  exports: [PollV2Component],
})
class PollV2Module {}

export default {
  title: 'PollV2Component',
  component: PollV2Component,
  decorators: [
    moduleMetadata({
      imports: [PollV2Module],
    }),
  ],
} as Meta;

export const userNotVoted: Story = () => ({
  moduleMetadata: {
    imports: [],
    providers: [provideMockStore()],
  },
  props: {
    poll: {
      id: '42',
      title: text('Poll title', 'How are you?'),
      options: [
        {
          id: '123',
          label: text('Option #1 label', 'Awesome!'),
          userHasSelected: false,
          voteCount: 5,
        },
        {
          id: '456',
          label: text('Option #2 label', 'Fine.'),
          userHasSelected: false,
          voteCount: 10,
        },
        {
          id: '789',
          label: text('Option #3 label', 'Not so good...'),
          userHasSelected: false,
          voteCount: 3,
        },
      ],
      isExpired: false,
    } as PollModel,
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
    moduleMetadata: {
      imports: [],
      providers: [provideMockStore()],
    },
    props: {
      poll: {
        id: '42',
        title: 'How are you?',
        options: [
          {
            id: '123',
            label: 'Awesome!',
            userHasSelected: selectedOption === '123',
            voteCount: number('Option #1 vote count', 5, { min: 0, step: 1 }),
          },
          {
            id: '456',
            label: 'Fine.',
            userHasSelected: selectedOption === '456',
            voteCount: number('Option #2 vote count', 10, { min: 0, step: 1 }),
          },
          {
            id: '789',
            label: 'Not so good...',
            userHasSelected: selectedOption === '789',
            voteCount: number('Option #3 vote count', 3, { min: 0, step: 1 }),
          },
        ],
        isExpired: false,
      } as PollModel,
    },
  };
};

export const expired: Story = () => ({
  moduleMetadata: {
    imports: [],
    providers: [provideMockStore()],
  },
  props: {
    poll: {
      id: '42',
      title: 'How are you?',
      options: [
        {
          id: '123',
          label: 'Awesome!',
          userHasSelected: false,
          voteCount: number('Option #1 vote count', 5, { min: 0, step: 1 }),
        },
        {
          id: '456',
          label: 'Fine.',
          userHasSelected: false,
          voteCount: number('Option #2 vote count', 10, { min: 0, step: 1 }),
        },
        {
          id: '789',
          label: 'Not so good...',
          userHasSelected: false,
          voteCount: number('Option #3 vote count', 3, { min: 0, step: 1 }),
        },
      ],
      isExpired: true,
    } as PollModel,
  },
});
