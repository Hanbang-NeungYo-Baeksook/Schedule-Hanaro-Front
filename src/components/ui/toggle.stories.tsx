import { cn } from '@/lib/utils';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'outline'],
      description: '토글의 시각적 스타일을 변경합니다.',
    },
    size: {
      control: 'radio',
      options: ['default', 'sm', 'lg'],
      description: '토글의 크기를 변경합니다.',
    },
    disabled: {
      control: 'boolean',
      description: '토글 버튼을 비활성화합니다.',
    },
    pressed: {
      control: 'boolean',
      description: '토글의 초기 상태를 설정합니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Radix UI의 Toggle 컴포넌트를 기반으로 스타일과 상태 관리를 지원하는 버튼입니다.',
      },
    },
  },
};

export default meta;

const ToggleExample = ({
  variant = 'default',
  size = 'default',
  disabled = false,
  pressed = false,
}: {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  pressed?: boolean;
}) => {
  const [isPressed, setIsPressed] = useState(pressed);

  return (
    <Toggle
      variant={variant}
      size={size}
      disabled={disabled}
      pressed={isPressed}
      onPressedChange={setIsPressed}
      className={cn('mx-2')}
    >
      {isPressed ? 'On' : 'Off'}
    </Toggle>
  );
};

type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    pressed: false,
  },
  render: (args) => <ToggleExample {...args} />,
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    pressed: false,
  },
  render: (args) => <ToggleExample {...args} />,
};

export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    pressed: false,
  },
  render: (args) => <ToggleExample {...args} />,
};

export const Large: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    pressed: false,
  },
  render: (args) => <ToggleExample {...args} />,
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    size: 'default',
    disabled: true,
    pressed: true,
  },
  render: (args) => <ToggleExample {...args} />,
};
