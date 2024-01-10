import React, { CSSProperties } from 'react';

export type ToasterType =
  | 'success'
  | 'error'
  | 'default'
  | 'loading'
  | 'warning';

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
  className?: string;
};

export type ToastsOptions = Partial<
  Pick<Toast, 'icon' | 'duration' | 'style' | 'className'>
> & {
  viewportStyle?: CSSProperties;
  viewportClassName?: string;
};

export type ToastOptions = Partial<Toast>;

export type ReactChildren =
  | React.JSX.Element
  | React.JSX.Element[]
  | string
  | null;

export type ToastArg = ToastOptions | ((toast: Toast) => ToastOptions);

export const isFunction = (fn: any): fn is Function => typeof fn === 'function';
