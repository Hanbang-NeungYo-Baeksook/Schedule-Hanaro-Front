import { Button } from '@/components/ui/button'; // Replace with your actual Button component
import { Input } from '@/components/ui/input'; // Replace with your actual Input component
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';

import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  firstName: string;
  email: string;
};

const meta: Meta = {
  title: 'Components/Form',
  component: Form,
};

export default meta;

const FormExample: React.FC = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      email: '',
    },
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-4'>
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormField
            name='firstName'
            control={methods.control}
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <FormControl>
                <Input placeholder='Enter your first name' {...field} />
              </FormControl>
            )}
          />
          <FormDescription>This is your given name.</FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Email Address</FormLabel>
          <FormField
            name='email'
            control={methods.control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Enter a valid email address',
              },
            }}
            render={({ field }) => (
              <FormControl>
                <Input placeholder='Enter your email' {...field} />
              </FormControl>
            )}
          />
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

// Story Definition
export const Default: StoryObj = {
  render: () => <FormExample />,
};
