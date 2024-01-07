import React, { useState } from 'react';
import toast from 'react-stacked-toast';

import { EmojiButton } from '../emoji-button';
import { Code } from '../code';

const examples: Array<{
  title: string;
  action: () => void;
  emoji: string;
  snippet: string;
}> = [
  {
    title: 'Success',
    emoji: '✅',
    snippet: `
toast.success({
  title: 'Successfully toasted!',
  description: 'You make a toast and it is successful.',
});
    `,
    action: () => {
      toast.success({
        title: 'Successfully toasted!',
        description: 'You make a toast and it is successful.',
      });
    },
  },
  {
    title: 'Error',
    emoji: '❌',
    snippet: `
toast.error({
  title: "This didn't work.",
  description: 'Try again.'
});
    `,

    action: () => {
      toast.error({ title: "This didn't work.", description: 'Try again.' });
    },
  },
  {
    title: 'Icon',
    emoji: '🥪',
    snippet: `
toast({
  title: 'Wanna try it?',
  icon: '🥪',
});
`,
    action: () => {
      toast({
        title: 'Wanna try it?',
        icon: '🥪',
      });
    },
  },
  {
    title: 'Dark Toast',
    emoji: '🌑',
    snippet: `
toast({
  title: 'Why not a dark toast?',
  icon: '👏',
  style: {
    borderRadius: '200px',
    background: '#333',
    color: '#fff',
  },
});
`,
    action: () => {
      toast({
        title: 'Why not a dark toast?',
        icon: '👏',
        style: {
          borderRadius: '200px',
          background: '#333',
          color: '#fff',
        },
      });
    },
  },
  {
    title: 'Custom',
    emoji: '🔩',
    snippet: `
toast((t) => ({
  description: (
    <span>
      Custom and <b>bold</b>
      <button
        type="button"
        className="ml-2 py-1 rounded px-2 border bg-gray-100 text-gray-900"
        onClick={() => toast.dismiss(t.id)}
      >
        Dismiss
      </button>
    </span>
  ),
}));
`,

    action: () => {
      toast((t) => ({
        description: (
          <span>
            Custom and <b>bold</b>
            <button
              type="button"
              className="ml-2 py-1 rounded px-2 border bg-gray-100 text-gray-900"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </span>
        ),
      }));
    },
  },
];

export const ToastExample = () => {
  const [snippet, setSnippet] = useState(examples[0].snippet);
  return (
    <section className="">
      <div className="flex items-center">
        <div className="w-full grid grid-cols-5 gap-2  rounded-xl mb-4">
          {examples.map((e) => (
            <EmojiButton
              key={e.title}
              emoji={e.emoji}
              onClick={() => {
                if (e.snippet) {
                  setSnippet(e.snippet);
                }
                e.action();
              }}
            >
              {e.title}
            </EmojiButton>
          ))}
        </div>
      </div>
      <div className="md:h-56 w-full overflow-auto rounded-lg">
        <Code snippet={snippet} className="!h-auto min-h-full" />
      </div>
    </section>
  );
};
