import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    showOutsideDays: {
      control: 'boolean',
      description:
        'Determines whether days outside the current month are shown.',
      defaultValue: true,
    },
    className: {
      control: 'text',
      description: 'Additional custom class names for the Calendar wrapper.',
    },
    mode: {
      control: 'select',
      options: ['single'],
      description: 'Specifies the mode for selecting dates.',
    },
    selected: {
      control: 'date',
      description: 'The currently selected date(s).',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showOutsideDays: true,
  },
};

export const SingleDateSelection: Story = {
  args: {
    mode: 'single',
    selected: new Date(),
  },
};
