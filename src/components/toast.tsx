import * as React from 'react';

interface ToastViewportProps {
  position: 'left' | 'center' | 'right';
}

function calculatePosition(
  position: ToastViewportProps['position']
): React.CSSProperties {
  if (position === 'left') {
    return {
      left: '32px',
    };
  }

  if (position === 'right') {
    return {
      right: '32px',
    };
  }

  return {
    left: '50%',
    transform: 'translateX(-50%)',
  };
}

const ToastViewport = (
  props: ToastViewportProps & React.HTMLProps<HTMLUListElement>
) => (
  <ul
    style={{
      position: 'fixed',
      zIndex: 3600,
      display: 'flex',
      maxHeight: '100vh',
      padding: '16px',
      top: '8px',
      ...calculatePosition(props.position),
      flexDirection: 'column',
      maxWidth: '420px',
    }}
    {...props}
  />
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
