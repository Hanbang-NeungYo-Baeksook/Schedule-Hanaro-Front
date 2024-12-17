import { Button } from '@/components/ui/button'; // Replace with your Button component or use a native button
import { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from './popover'; // Adjust the import path

// Meta configuration for the Popover component
const meta: Meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          'A flexible and customizable Popover component built using Radix UI primitives.',
      },
    },
  },
};

export default meta;

// Default Popover Example
const PopoverExample = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className='bg-white p-4 text-black shadow-lg'>
        <p className='text-sm'>This is the content of the popover.</p>
      </PopoverContent>
    </Popover>
  );
};

// Define a Story type
type Story = StoryObj;

// Default Popover Story
export const Default: Story = {
  render: () => <PopoverExample />,
};

// Popover with Custom Content Story
const CustomContentExample = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Custom Popover</Button>
      </PopoverTrigger>
      <PopoverContent className='rounded-lg bg-gray-800 p-4 text-white'>
        <h3 className='text-lg font-bold'>Custom Content</h3>
        <p className='mt-2 text-sm'>
          You can customize the content and styling of the popover.
        </p>
      </PopoverContent>
    </Popover>
  );
};

export const CustomContent: Story = {
  render: () => <CustomContentExample />,
};

// Popover with Long Content Story
const LongContentExample = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Long Content</Button>
      </PopoverTrigger>
      <PopoverContent className='bg-white p-4 text-black shadow-lg'>
        <p className='text-sm'>
          This is a long popover content example. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
      </PopoverContent>
    </Popover>
  );
};

export const LongContent: Story = {
  render: () => <LongContentExample />,
};
