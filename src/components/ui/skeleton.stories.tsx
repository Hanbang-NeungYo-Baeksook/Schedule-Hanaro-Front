import { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS class for styling the skeleton.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A skeleton component that serves as a placeholder while content is loading, with a subtle pulse animation.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'h-6 w-32',
  },
};

export const Avatar: Story = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
};

export const TextLine: Story = {
  args: {
    className: 'h-4 w-full',
  },
  render: (args) => (
    <div className='space-y-2'>
      <Skeleton {...args} />
      <Skeleton className='h-4 w-3/4' />
      <Skeleton className='h-4 w-1/2' />
    </div>
  ),
};

export const CustomSize: Story = {
  args: {
    className: 'h-10 w-64',
  },
};
