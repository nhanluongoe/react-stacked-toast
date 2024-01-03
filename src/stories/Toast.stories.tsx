import { Meta, StoryFn } from '@storybook/react';

import { useState } from 'react';
import { Toaster } from '../components/toaster';
import { useToast } from '../core/use-toast';

export default {
  title: 'Toaster',
  component: Toaster,
  argTypes: {},
} as Meta<typeof Toaster>;

const Template: StoryFn<typeof Toaster> = () => {
  const { toast } = useToast();

  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster />
      <button
        type="button"
        onClick={() => {
          toast({
            title: `Scheduled: Catch up ${count}`,
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
          setCount((prev) => prev + 1);
        }}
      >
        Show Toast
      </button>
    </div>
  );
};

export const Basic = Template.bind({});

export const Success: StoryFn<typeof Toaster> = () => {
  const { toast } = useToast();

  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster />
      <button
        type="button"
        onClick={() => {
          toast.error({
            title: `Scheduled: Catch up ${count}`,
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
          setCount((prev) => prev + 1);
        }}
      >
        Show Toast
      </button>
    </div>
  );
};
