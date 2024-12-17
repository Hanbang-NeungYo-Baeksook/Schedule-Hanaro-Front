import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { BackButton } from './back';

const meta = {
  title: 'Components/BackButton',
  component: BackButton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS class names for the button.',
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className='flex h-10 w-10 items-center justify-center'>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof BackButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'bg-gray-200 hover:bg-gray-300 rounded-full p-2',
  },
};
