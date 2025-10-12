import type { Meta, StoryObj } from '@storybook/vue3';

import Error from './Error.vue';

const meta = {
  component: Error,
  title: 'Components/UI/Error',
} satisfies Meta<typeof Error>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithString: Story = {
  args: {
    error: 'Something went wrong. Please try again.',
  },
};

export const WithErrorObject: Story = {
  args: {
    error: 'Network request failed',
  },
  render: () => ({
    components: { Error },
    setup() {
      const errorObj = new Error('Network request failed');
      return { errorObj };
    },
    template: '<Error :error="errorObj" />',
  }),
};

export const LongMessage: Story = {
  args: {
    error: 'An unexpected error occurred while processing your request. Please check your connection and try again later.',
  },
};
