import React from 'react';

export type ToasterType = 'success' | 'error' | 'default';

export type Toast = {
  id: string;
  type: ToasterType;
  createdAt: number;
  visible: boolean;
  description?: React.ReactNode;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  duration?: number; // miliseconds
};
export type ToastOptions = Partial<Toast>;
export type ToastOptionsWithoutType = Omit<ToastOptions, 'type'>;
