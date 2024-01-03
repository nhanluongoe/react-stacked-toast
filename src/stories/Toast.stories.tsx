import { Meta, StoryFn } from '@storybook/react';

import { useState } from 'react';
import { ToastAction, Toaster, useToast } from '..';

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
      <Toaster duration={2000} />
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

export const WithAction: StoryFn<typeof Toaster> = () => {
  const { toast } = useToast();

  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster duration={2000} />
      <button
        type="button"
        onClick={() => {
          toast({
            title: `Scheduled: Catch up ${count}`,
            description: 'Friday, February 10, 2023 at 5:57 PM',
            action: <ToastAction altText="Undo">Undo</ToastAction>,
          });
          setCount((prev) => prev + 1);
        }}
      >
        Show Toast
      </button>
    </div>
  );
};
