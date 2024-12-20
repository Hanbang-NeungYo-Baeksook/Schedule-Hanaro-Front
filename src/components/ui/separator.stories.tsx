import { Meta, StoryObj } from '@storybook/react';
import { Separator } from './separator'; // Adjust the path to your Separator component

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the separator.',
      defaultValue: 'horizontal',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class for additional styling.',
    },
    decorative: {
      control: 'boolean',
      description: 'Marks the separator as purely decorative.',
      defaultValue: true,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A separator component that can be used to visually divide sections of content either horizontally or vertically.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    className: '',
  },
  render: (args) => (
    <div className='space-y-2'>
      <div>Content Above</div>
      <Separator {...args} />
      <div>Content Below</div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    className: 'h-20',
  },
  render: (args) => (
    <div className='flex items-center space-x-2'>
      <div>Left Content</div>
      <Separator {...args} />
      <div>Right Content</div>
    </div>
  ),
};

export const CustomStyled: Story = {
  args: {
    orientation: 'horizontal',
    className: 'bg-red-500 h-[2px]',
  },
  render: (args) => (
    <div className='space-y-2'>
      <div>Above with Red Separator</div>
      <Separator {...args} />
      <div>Below with Red Separator</div>
    </div>
  ),
};
