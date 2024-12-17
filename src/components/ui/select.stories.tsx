import { cn } from '@/lib/utils';
import { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';

const meta: Meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'A customizable and accessible select component built with Radix UI primitives.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className={cn('w-[200px]')}>
        <SelectValue placeholder='Select an option' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='cherry'>Cherry</SelectItem>
          <SelectSeparator />
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value='carrot'>Carrot</SelectItem>
          <SelectItem value='spinach'>Spinach</SelectItem>
          <SelectItem value='broccoli'>Broccoli</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithDisabledOption: Story = {
  render: () => (
    <Select>
      <SelectTrigger className={cn('w-[200px]')}>
        <SelectValue placeholder='Select an option' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='cherry' disabled>
            Cherry (Disabled)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const CustomStyled: Story = {
  render: () => (
    <Select>
      <SelectTrigger className='w-[200px] rounded-lg bg-blue-500 text-white'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent className='bg-blue-100 text-blue-800'>
        <SelectGroup>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='cherry'>Cherry</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
