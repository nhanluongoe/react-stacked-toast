'use client';

import { useEffect, useState } from 'react';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';
import { useToast } from './use-toast';

interface ToasterProps {
  duration?: number;
}

export function Toaster(props: ToasterProps) {
  const { duration = 5 * 1000 } = props;

  const { toasts } = useToast();
  const [collapsed, setCollapsed] = useState(true);
  const [hovered, setHovered] = useState<string[]>([]);

  useEffect(() => {
    if (toasts.length === 0) {
      setCollapsed(true);
    }
  }, [toasts]);

  const handleMouseEnter = (id: string) => {
    setHovered((prev) => [...prev, id]);
    setCollapsed(false);
  };

  const handleMouseLeave = (id: string) => {
    setHovered((prev) => prev.filter((item) => item !== id));
    setCollapsed(true);
  };

  return (
    <ToastProvider duration={duration}>
      {toasts.map(({ id, title, description, action, ...restProps }, index) => (
        <Toast
          key={id}
          {...restProps}
          idx={index}
          collapsed={collapsed.toString()}
          onMouseEnter={() => handleMouseEnter(id)}
          onMouseLeave={() => handleMouseLeave(id)}
        >
          <div
            style={{
              display: 'grid',
              gap: '0.25rem',
            }}
          >
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          {hovered.includes(id) && <ToastClose />}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
