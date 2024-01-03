import { Cross2Icon } from '@radix-ui/react-icons';
import * as ToastPrimitives from '@radix-ui/react-toast';
import * as React from 'react';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={className}
    style={{
      position: 'fixed',
      zIndex: 100,
      display: 'flex',
      maxHeight: '100vh',
      width: '100%',
      padding: '16px',
      right: '32px',
      top: '16px',
      flexDirection: 'column-reverse',
      maxWidth: '420px',
    }}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

type ExtendedToastProps = React.ComponentPropsWithoutRef<
  typeof ToastPrimitives.Root
> & {
  collapsed?: string;
  idx?: number;
};
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ExtendedToastProps
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={className}
    style={{
      zIndex: 5500 - props.idx!,
      display: 'flex',
      position: 'relative',
      justifyContent: 'space-between',
      border: '1px solid #e2e8f0',
      width: '100%',
      maxWidth: '560px',
      minWidth: '300px',
      transform:
        props.collapsed === 'true'
          ? `scaleX(${1 - props.idx! * 0.05}) translateY(-${props.idx! * 95}%)`
          : 'none',
      transition: 'transform 0.3s ease-in-out',
      boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
      background: 'white',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '8px',
    }}
    {...props}
  />
));
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={className}
    style={{
      display: 'inline-flex',
      height: '2rem',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.375rem',
      backgroundColor: 'transparent',
      border: '1px solid #e2e8f0',
      padding: '0.75rem',
      fontSize: '0.875rem',
      cursor: 'pointer',
      fontWeight: 500,
      transitionProperty: 'color, background-color',
      transitionDuration: '0.2s',
    }}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={className}
    style={{
      position: 'absolute',
      borderRadius: '0.375rem',
      backgroundColor: 'transparent',
      top: '0px',
      right: '0px',
      border: 'none',
      padding: '2px',
      cursor: 'pointer',
      color: 'black',
      transition: 'opacity 0.2s',
    }}
    {...props}
  >
    <Cross2Icon className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={className}
    style={{
      fontSize: '0.875rem',
      fontWeight: 600,
      color: 'black',
      textAlign: 'left',
    }}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={className}
    style={{
      color: 'black',
      fontSize: '0.75rem',
      textAlign: 'left',
    }}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
};
