import * as React from 'react';

interface ToastViewportProps {
  children?: React.ReactNode;
}

const ToastViewport = ({ children }: ToastViewportProps) => (
  <ul
    style={{
      position: 'fixed',
      zIndex: 100,
      display: 'flex',
      maxHeight: '100vh',
      padding: '16px',
      right: '32px',
      top: '16px',
      flexDirection: 'column',
      maxWidth: '420px',
    }}
  >
    {children}
  </ul>
);
ToastViewport.displayName = 'ToastViewport';

const Toast = (
  props: React.HTMLProps<HTMLLIElement> & {
    collapsed?: string;
    idx?: number;
  }
) => {
  return (
    <li
      style={{
        zIndex: 5500 - props.idx!,
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        width: 'content-fit',
        maxWidth: '560px',
        minWidth: '300px',
        transform:
          props.collapsed === 'true'
            ? `scaleX(${1 - props.idx! * 0.05}) translateY(${
                -props.idx! * 95
              }%)`
            : 'none',
        transition: 'transform 0.35s cubic-bezier(.06,.71,.55,1)',
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
        background: 'white',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '8px',
      }}
      {...props}
    />
  );
};
Toast.displayName = 'Toast';

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

export { Toast, ToastViewport, type ToastProps };
