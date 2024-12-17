import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['single', 'multiple'],
      description: 'Accordion type: single or multiple',
    },
    defaultValue: {
      control: 'text',
      description: 'Default opened accordion item',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className='mx-auto w-full max-w-md'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Accordion Item 1</AccordionTrigger>
        <AccordionContent>
          This is the content for the first accordion item.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Accordion Item 2</AccordionTrigger>
        <AccordionContent>
          This is the content for the second accordion item.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Accordion Item 3</AccordionTrigger>
        <AccordionContent>
          This is the content for the third accordion item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
