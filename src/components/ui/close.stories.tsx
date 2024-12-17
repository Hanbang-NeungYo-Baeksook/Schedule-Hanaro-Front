import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { CloseButton } from './close';

const meta = {
  title: 'Components/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom class names for the CloseButton component.',
    },
    location: {
      control: 'text',
      description: 'Determines the navigation route when clicked.',
      defaultValue: '',
    },
  },
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: '',
    location: '',
  },
};

export const WithLocation: Story = {
  args: {
    className: '',
    location: 'reservation/visit',
  },
};

export const CustomStyle: Story = {
  args: {
    className: 'bg-red-500 rounded-full p-2',
    location: '',
  },
};
