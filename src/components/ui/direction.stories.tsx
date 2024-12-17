import type { Meta, StoryObj } from '@storybook/react';
import { DirectionButton } from './direction';

const meta = {
  title: 'Components/DirectionButton',
  component: DirectionButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'square',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      description: 'Button style variants',
      defaultValue: 'default',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    className: {
      control: 'text',
      description: 'Additional custom classes',
    },
  },
} satisfies Meta<typeof DirectionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: '길찾기',
  },
};

export const Square: Story = {
  args: {
    variant: 'square',
    children: '길찾기',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: '길찾기',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: '길찾기',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '길찾기',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '길찾기',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: '길찾기',
  },
};
