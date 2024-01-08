import React, { useState } from 'react';
import toast, { Toaster } from 'react-stacked-toast';
import { Code } from '../code';

interface Example {
  title: string;
  snippet: string;
  action: () => void;
}

const Examples: Example[] = [
  {
    title: 'left',
    snippet: `
  <Toaster position="left"/>
    `,
    action: () => {
      toast.success({
        title: 'Successfully toasted!',
        description: 'You make a toast and it is successful.',
      });
    },
  },
  {
    title: 'center',
    snippet: `
  <Toaster position="center"/>
    `,
    action: () => {
      toast.success({
        title: 'Successfully toasted!',
        description: 'You make a toast and it is successful.',
      });
    },
  },
  {
    title: 'right',
    snippet: `
  <Toaster position="right"/>
    `,
    action: () => {
      toast.success({
        title: 'Successfully toasted!',
        description: 'You make a toast and it is successful.',
      });
    },
  },
];

export const ToasterExample: React.FC = () => {
  const [position, setPosition] = useState<'left' | 'center' | 'right'>(
    Examples[2].title as 'left' | 'center' | 'right'
  );
  const [snippet, setSnippet] = useState<string>(Examples[2].snippet);

  return (
    <section className="">
      <div className="flex items-center">
        <div className="w-full grid grid-cols-5 gap-2  rounded-xl mb-4">
          {Examples.map((e) => (
            <button
              key={e.snippet + e.title}
              className="rounded bg-white text-sm font-semibold py-2 px-2 shadow-small-button flex items-center justify-center"
              type="button"
              onClick={() => {
                if (e.snippet) {
                  setSnippet(e.snippet);
                }
                e.action();
                setPosition(e.title as 'left' | 'center' | 'right');
              }}
            >
              {e.title}
            </button>
          ))}
        </div>
      </div>
      <div className="md:h-28 w-full overflow-auto rounded-lg">
        <Code snippet={snippet} className="!h-auto min-h-full" />
      </div>
      <Toaster position={position} />
    </section>
  );
};
