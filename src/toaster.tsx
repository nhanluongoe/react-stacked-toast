'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
  children?: React.ReactNode;
  providerProps?: React.ComponentPropsWithoutRef<typeof ToastProvider>;
  rootProps?: React.ComponentPropsWithoutRef<typeof Toast>;
  viewportProps?: React.ComponentPropsWithoutRef<typeof ToastViewport>;
}

const ContentContainer = styled.div`
  display: grid;
  gap: 0.25rem;
`;

export function Toaster(props: ToasterProps) {
  const { providerProps, viewportProps, rootProps } = props;

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
    <ToastProvider {...providerProps}>
      {toasts.map(({ id, title, description, action, ...restProps }, index) => (
        <Toast
          key={id}
          onMouseEnter={() => handleMouseEnter(id)}
          onMouseLeave={() => handleMouseLeave(id)}
          {...restProps}
          idx={index}
          collapsed={collapsed.toString()}
          {...rootProps}
        >
          <ContentContainer>
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </ContentContainer>
          {action}
          {hovered.includes(id) && <ToastClose />}
        </Toast>
      ))}
      <ToastViewport {...viewportProps} />
    </ToastProvider>
  );
}
