import { Button } from '@/components/ui/button';
import { Meta, StoryObj } from '@storybook/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: TooltipContent,
  parameters: {
    docs: {
      description: {
        component:
          'A customizable and accessible Tooltip component built using Radix UI primitives.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const DefaultTooltipExample = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='outline'>Show Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side='top'>This is a top-aligned tooltip.</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const PositionsTooltipExample = () => (
  <TooltipProvider>
    <div className='flex items-center space-x-4'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline'>Top</Button>
        </TooltipTrigger>
        <TooltipContent side='top'>Top Tooltip</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline'>Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side='bottom'>Bottom Tooltip</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline'>Left</Button>
        </TooltipTrigger>
        <TooltipContent side='left'>Left Tooltip</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline'>Right</Button>
        </TooltipTrigger>
        <TooltipContent side='right'>Right Tooltip</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
);

// 커스텀 간격 예제 컴포넌트
const CustomOffsetTooltipExample = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='outline'>Custom Offset</Button>
      </TooltipTrigger>
      <TooltipContent side='top' sideOffset={12}>
        Tooltip with 12px offset.
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const Default: Story = {
  render: () => <DefaultTooltipExample />,
};

export const Positions: Story = {
  render: () => <PositionsTooltipExample />,
};

export const CustomOffset: Story = {
  render: () => <CustomOffsetTooltipExample />,
};
