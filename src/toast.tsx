import { Cross2Icon } from '@radix-ui/react-icons';
import * as ToastPrimitives from '@radix-ui/react-toast';
import * as React from 'react';
import styled from 'styled-components';

const ToastProvider = ToastPrimitives.Provider;

const StyledViewport = styled(ToastPrimitives.Viewport)`
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  max-height: 100vh;
  width: 100%;
  padding: 16px;
  right: 32px;
  top: 16px;
  flex-direction: column-reverse;
  max-width: 420px;
`;
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <StyledViewport ref={ref} className={className} {...props} />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

type ExtendedToastProps = React.ComponentPropsWithoutRef<
  typeof ToastPrimitives.Root
> & {
  collapsed?: string;
  idx?: number;
};
const StyledRoot = styled(ToastPrimitives.Root)<ExtendedToastProps>`
  z-index: ${(props) => 5500 - props.idx!};
  display: flex;
  position: relative;
  justify-content: space-between;
  border: 1px solid #e2e8f0;
  width: 100%;
  max-width: 560px;
  min-width: 300px;
  transform: ${(props) =>
    props.collapsed === 'true'
      ? `scaleX(${1 - props.idx! * 0.05}) translateY(-${props.idx! * 95}%)`
      : 'none'};
  transition: transform 0.3s ease-in-out;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;
`;
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ExtendedToastProps
>(({ className, ...props }, ref) => (
  <StyledRoot ref={ref} className={className} {...props} />
));
Toast.displayName = ToastPrimitives.Root.displayName;

const StyledAction = styled(ToastPrimitives.Action)`
  display: inline-flex;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  background-color: transparent;
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 500;
  transition-property: color, background-color;
  transition-duration: 0.2s;
  &:hover {
    background-color: #f2f4f6;
  }
  &:focus {
    outline: none;
    ring: 1px;
    ring-color: #93c5fd;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <StyledAction ref={ref} className={className} {...props} />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const StyledClose = styled(ToastPrimitives.Close)`
  position: absolute;
  border-radius: 0.375rem;
  background-color: transparent;
  top: 0px;
  right: 0px;
  border: none;
  padding: 2px;
  cursor: pointer;
  color:;
  transition: opacity 0.2s;
  &:hover {
    color: #e53e3e;
  }
`;
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <StyledClose ref={ref} className={className} toast-close="" {...props}>
    <Cross2Icon className="h-4 w-4" />
  </StyledClose>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const StyledTitle = styled(ToastPrimitives.Title)`
  font-size: 0.875rem;
  font-weight: 600;
  & + div {
    font-size: 0.75rem;
  }
`;
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <StyledTitle ref={ref} className={className} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={className} {...props} />
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
