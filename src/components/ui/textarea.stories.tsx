import { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
      defaultValue: 'Enter your text here...',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class for additional styling',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea input',
    },
    rows: {
      control: 'number',
      description: 'Number of rows in the textarea',
      defaultValue: 4,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A customizable and responsive textarea component for multi-line text input.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
    className: '',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
  },
};

export const CustomStyled: Story = {
  args: {
    placeholder: 'Custom styled textarea',
    className: 'border-red-500 text-red-600 placeholder:text-red-300',
  },
};

export const Resizable: Story = {
  args: {
    placeholder: 'This textarea can be resized',
    className: 'resize',
  },
};

export const FixedRows: Story = {
  args: {
    placeholder: 'Textarea with fixed rows',
    rows: 6,
  },
};
