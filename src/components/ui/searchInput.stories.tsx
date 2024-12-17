import { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './searchInput'; // Adjust the path to your SearchInput component

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
      defaultValue: '영업점을 검색하세요...',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class for additional styling',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the search input',
    },
    type: {
      control: 'text',
      description: 'Input type',
      defaultValue: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A search input component with a leading search icon, styled and customizable.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: '영업점을 검색하세요...',
    className: '',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search for branches...',
    className: '',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Input is disabled...',
    disabled: true,
  },
};

export const CustomClass: Story = {
  args: {
    placeholder: 'Search here...',
    className: 'border-red-500 text-red-500 placeholder:text-red-300',
  },
};
