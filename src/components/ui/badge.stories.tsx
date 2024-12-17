import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'lightSolid',
        'active',
        'noactive',
      ],
      description: 'Select the variant style for the Badge.',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class names for the badge.',
    },
    children: {
      control: 'text',
      description: 'Badge content.',
      defaultValue: 'Badge',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Badge',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Badge',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Badge',
  },
};

export const LightSolid: Story = {
  args: {
    variant: 'lightSolid',
    children: 'Light Solid Badge',
  },
};

export const Active: Story = {
  args: {
    variant: 'active',
    children: 'Active Badge',
  },
};

export const NoActive: Story = {
  args: {
    variant: 'noactive',
    children: 'No Active Badge',
  },
};
