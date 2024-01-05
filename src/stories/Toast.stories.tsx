import { Meta, StoryFn } from '@storybook/react';

import { useState } from 'react';
import { Toaster } from '../components/toaster';
import { toast } from '../core/use-toast';

export default {
  title: 'Toaster',
  component: Toaster,
  argTypes: {},
} as Meta<typeof Toaster>;

const Template: StoryFn<typeof Toaster> = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster />
      <button
        type="button"
        onClick={() => {
          toast({
            title: `Scheduled: Catch up ${count}`,
            description:
              'Friday, February 10, 2023 at 5:57 PM, lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            duration: 60 * 1000,
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
  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster position="left" />
      <button
        type="button"
        onClick={() => {
          toast.success({
            title: `Scheduled: Catch up ${count}`,
            description: 'Friday, February 10, 2023 at 5:57 PM',
            duration: 60 * 1000,
          });
          setCount((prev) => prev + 1);
        }}
      >
        Show Toast
      </button>
    </div>
  );
};

export const Error: StoryFn<typeof Toaster> = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster position="center" />
      <button
        type="button"
        onClick={() => {
          toast.error({
            title: `Scheduled: Catch up ${count}`,
            description: 'Friday, February 10, 2023 at 5:57 PM',
            duration: 3 * 1000,
          });
          setCount((prev) => prev + 1);
        }}
      >
        Show Toast
      </button>
    </div>
  );
};

export const CustomIcon: StoryFn<typeof Toaster> = () => {
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
            duration: 3 * 1000,
            icon: '👋',
          });
          setCount((prev) => prev + 1);
        }}
      >
        Show Toast
      </button>
    </div>
  );
};

export const DarkToast: StoryFn<typeof Toaster> = () => {
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
            duration: 3 * 1000,
            icon: '👋',
            style: {
              backgroundColor: '#333',
              color: '#fff',
            },
          });
          setCount((prev) => prev + 1);
        }}
      >
        Show Toast
      </button>
    </div>
  );
};

export const CustomToast: StoryFn<typeof Toaster> = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster />
      <button
        type="button"
        onClick={() => {
          toast((t) => {
            console.log(t.id);
            return {
              title: <p>I feel dizzy! {count}</p>,
              description: (
                <span>
                  Custom and <b>bold</b>
                  <button type="button" onClick={() => toast.dismiss(t.id)}>
                    Dismiss
                  </button>
                </span>
              ),
              duration: 100 * 10 * 1000,
              icon: '😵‍💫',
              style: {
                backgroundColor: '#333',
                color: '#fff',
              },
              id: '99',
            };
          });
          setCount((prev) => prev + 1);
        }}
      >
        Show Toast
      </button>
    </div>
  );
};

export const GeneralOptions: StoryFn<typeof Toaster> = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster
        toastOptions={{
          icon: '😵‍💫',
          duration: 100,
          style: {
            backgroundColor: '#333',
            color: '#fff',
          },
        }}
      />
      <button
        type="button"
        onClick={() => {
          toast((t) => {
            console.log(t.id);
            return {
              title: <p>I feel dizzy! {count}</p>,
              description: (
                <span>
                  Custom and <b>bold</b>
                  <button type="button" onClick={() => toast.dismiss(t.id)}>
                    Dismiss
                  </button>
                </span>
              ),
              duration: 0,
            };
          });
          setCount((prev) => prev + 1);
        }}
      >
        Show Toast
      </button>
    </div>
  );
};
