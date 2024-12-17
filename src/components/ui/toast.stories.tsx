import { Button } from '@/components/ui/button';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

// Meta configuration
const meta: Meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component:
          'A flexible and animated toast notification system built using Radix UI primitives.',
      },
    },
  },
};

export default meta;

const DefaultToastExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <Button onClick={() => setOpen(true)}>Show Toast</Button>
      <Toast open={open} onOpenChange={setOpen}>
        <div className='flex flex-col space-y-1'>
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>This is a default toast message.</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

const DestructiveToastExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <Button
        onClick={() => setOpen(true)}
        className='bg-red-500 text-white hover:bg-red-600'
      >
        Show Destructive Toast
      </Button>
      <Toast open={open} onOpenChange={setOpen} variant='destructive'>
        <div className='flex flex-col space-y-1'>
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>
            This is a destructive toast message.
          </ToastDescription>
        </div>
        <ToastAction altText='Retry' onClick={() => alert('Retry clicked')}>
          Retry
        </ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

const CustomStyledToastExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <Button onClick={() => setOpen(true)}>Show Custom Toast</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        className='border-blue-700 bg-blue-500 text-white'
      >
        <div className='flex flex-col space-y-1'>
          <ToastTitle>Custom Styled</ToastTitle>
          <ToastDescription>This toast uses custom styling.</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
};

type Story = StoryObj;

export const Default: Story = {
  render: () => <DefaultToastExample />,
};

export const Destructive: Story = {
  render: () => <DestructiveToastExample />,
};

export const CustomStyled: Story = {
  render: () => <CustomStyledToastExample />,
};
