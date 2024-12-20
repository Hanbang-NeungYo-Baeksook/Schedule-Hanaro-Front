import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom class names for the Checkbox component.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox.',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Sets the initial checked state of the checkbox.',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
};

export const CustomStyle: Story = {
  args: {
    className: 'border-main bg-main text-white',
    defaultChecked: true,
  },
};
