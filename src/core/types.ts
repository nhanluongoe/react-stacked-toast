import React from 'react';

export type ToasterType = 'success' | 'error' | 'default';

export type Toast = {
  id: string;
  type: ToasterType;
  description?: React.ReactNode;
  title?: React.ReactNode;
  icon?: React.ReactNode;
};
export type ToastOptions = Partial<Toast>;
export type ToastOptionsWithoutType = Omit<ToastOptions, 'type'>;
