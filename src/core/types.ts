import React, { CSSProperties } from 'react';

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
  style?: CSSProperties;
};

export type ToastsOptions = Partial<
  Pick<Toast, 'id' | 'icon' | 'duration' | 'style'>
>;
export type ToastOptions = Partial<Toast>;

export type ReactChildren =
  | React.JSX.Element
  | React.JSX.Element[]
  | string
  | null;

export type ToastArg = ToastOptions | ((toast: Toast) => ToastOptions);

export const isFunction = (fn: any): fn is Function => typeof fn === 'function';
