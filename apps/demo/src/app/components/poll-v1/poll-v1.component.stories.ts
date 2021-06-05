import { text, number, boolean } from '@storybook/addon-knobs';
import { PollV1Component } from './poll-v1.component';

export default {
  title: 'PollV1Component',
  component: PollV1Component
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  props: {
    poll: text('poll', null),
  }
})