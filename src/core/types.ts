import React from 'react';

export type ToasterType = 'success' | 'error' | 'loading' | 'default';

export type Toast = {
  id: string;
  type: ToasterType;
  description?: React.ReactNode;
  title?: React.ReactNode;
};

export type ToastOptions = Partial<Toast>;
