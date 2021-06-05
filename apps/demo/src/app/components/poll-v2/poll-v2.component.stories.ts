import { text, number, boolean } from '@storybook/addon-knobs';
import { PollV2Component } from './poll-v2.component';

export default {
  title: 'PollV2Component',
  component: PollV2Component
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  props: {
    poll: text('poll', ''),
  }
})