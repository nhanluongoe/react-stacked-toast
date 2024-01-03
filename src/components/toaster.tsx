'use client';

import { useEffect, useState } from 'react';
import { Toast, ToastViewport } from './toast';
import { useToast } from '../core/use-toast';

export function Toaster() {
  const { toasts } = useToast();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (toasts.length === 0) {
      setCollapsed(true);
    }
  }, [toasts]);

  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  return (
    <ToastViewport>
      {toasts.map(({ id, title, description, ...restProps }, index) => (
        <Toast
          key={id}
          {...restProps}
          idx={index}
          collapsed={collapsed.toString()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              display: 'grid',
              gap: '0.25rem',
            }}
          >
            {title && (
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'black',
                  textAlign: 'left',
                  margin: 0,
                }}
              >
                {title}
              </p>
            )}

            {description && (
              <p
                style={{
                  color: 'black',
                  fontSize: '0.75rem',
                  textAlign: 'left',
                  margin: 0,
                }}
              >
                {description}
              </p>
            )}
          </div>
        </Toast>
      ))}
    </ToastViewport>
  );
}
