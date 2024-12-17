import { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID of the input the label is associated with.',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class for styling the label.',
    },
    children: {
      control: 'text',
      description: 'Content inside the label.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A customizable and accessible label component using Radix UI.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    htmlFor: 'input-id',
    children: 'Default Label',
  },
};

export const WithCustomClass: Story = {
  args: {
    htmlFor: 'input-id',
    children: 'Styled Label',
    className: 'text-red-500 font-bold',
  },
};

export const Disabled: Story = {
  render: () => (
    <div>
      <Label htmlFor='input-id' className='peer-disabled'>
        Disabled Label
      </Label>
      <input
        id='input-id'
        type='text'
        disabled
        className='peer rounded border px-2 py-1'
      />
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    htmlFor: 'input-id',
    children:
      'This is a very long label that spans multiple lines to demonstrate text wrapping and layout behavior in various container widths.',
  },
};
