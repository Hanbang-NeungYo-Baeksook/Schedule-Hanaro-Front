import { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'; // Adjust the path to match your project

const meta: Meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'A customizable Tabs component built with Radix UI primitives, supporting dynamic content switching.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue='tab1' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
        <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
        <TabsTrigger value='tab3'>Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>
        <div className='rounded-md bg-gray-100 p-4'>Content for Tab 1</div>
      </TabsContent>
      <TabsContent value='tab2'>
        <div className='rounded-md bg-gray-100 p-4'>Content for Tab 2</div>
      </TabsContent>
      <TabsContent value='tab3'>
        <div className='rounded-md bg-gray-100 p-4'>Content for Tab 3</div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTrigger: Story = {
  render: () => (
    <Tabs defaultValue='tab1' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
        <TabsTrigger value='tab2' disabled>
          Tab 2 (Disabled)
        </TabsTrigger>
        <TabsTrigger value='tab3'>Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>
        <div className='rounded-md bg-gray-100 p-4'>Content for Tab 1</div>
      </TabsContent>
      <TabsContent value='tab3'>
        <div className='rounded-md bg-gray-100 p-4'>Content for Tab 3</div>
      </TabsContent>
    </Tabs>
  ),
};

export const CustomStyled: Story = {
  render: () => (
    <Tabs defaultValue='tab1' className='w-[400px]'>
      <TabsList className='rounded-lg bg-blue-500 text-white'>
        <TabsTrigger
          value='tab1'
          className='data-[state=active]:bg-blue-700 data-[state=active]:text-white'
        >
          Tab 1
        </TabsTrigger>
        <TabsTrigger
          value='tab2'
          className='data-[state=active]:bg-blue-700 data-[state=active]:text-white'
        >
          Tab 2
        </TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>
        <div className='rounded-md bg-blue-100 p-4'>
          Custom Content for Tab 1
        </div>
      </TabsContent>
      <TabsContent value='tab2'>
        <div className='rounded-md bg-blue-100 p-4'>
          Custom Content for Tab 2
        </div>
      </TabsContent>
    </Tabs>
  ),
};
