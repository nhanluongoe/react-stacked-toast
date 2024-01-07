import clsx from 'clsx';
import React from 'react';
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from 'prism-react-renderer';

const theme: PrismTheme = {
  plain: {
    backgroundColor: '#282828',
    color: '#ebdbb2',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: '#928374',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['tag', 'operator', 'number', 'module'],
      style: {
        color: '#fabd2f',
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: '#b8bb26',
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: '#fb4934',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: '#83a598',
      },
    },
    {
      types: [
        'boolean',
        'string',
        'entity',
        'url',
        'attr-value',
        'keyword',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'at-rule',
        'placeholder',
        'variable',
      ],
      style: {
        color: '#fe8019',
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#fb4934',
      },
    },
  ],
};

export const Code: React.FC<{
  snippet: string;
  language?: Language;
  className?: string;
}> = (props) => {
  const language = props.language || 'jsx';

  return (
    <Highlight
      {...defaultProps}
      code={props.snippet}
      theme={theme}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(
            props.className,
            className,
            'h-full w-full rounded-lg p-4 overflow-x-auto flex flex-col items justify-center'
          )}
          style={style}
        >
          {tokens.map((line, i) => {
            if (tokens.length - 1 === i && line[0].empty) {
              return null;
            }

            return (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};
