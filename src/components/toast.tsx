import React, { CSSProperties, HTMLProps } from 'react';

interface ToastViewportProps {
  position: 'left' | 'center' | 'right';
}

function calculatePosition(
  position: ToastViewportProps['position']
): CSSProperties {
  if (position === 'left') {
    return {
      left: '16px',
    };
  }

  if (position === 'right') {
    return {
      right: '16px',
    };
  }

  return {
    left: '50%',
    transform: 'translateX(-50%)',
  };
}

const ToastViewport: React.FC<
  ToastViewportProps & HTMLProps<HTMLUListElement>
> = (props) => (
  <ul
    style={{
      position: 'fixed',
      zIndex: 3600,
      display: 'flex',
      maxHeight: '100vh',
      padding: '8px',
      top: '8px',
      ...calculatePosition(props.position),
      flexDirection: 'column',
      maxWidth: '420px',
    }}
    {...props}
  />
);
ToastViewport.displayName = 'ToastViewport';

const Toast: React.FC<
  HTMLProps<HTMLLIElement> & { collapsed?: string; idx?: number }
> = (props) => {
  const { collapsed, idx, style, ...restProps } = props;
  const transformValue =
    collapsed === 'true'
      ? `scaleX(${1 - idx! * 0.05}) translateY(${-idx! * 95}%)`
      : 'none';

  return (
    <li
      style={{
        zIndex: 5500 - idx!,
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        width: 'content-fit',
        transform: transformValue,
        transition: 'transform 0.35s cubic-bezier(.06,.71,.55,1)',
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
        background: '#fff',
        color: '#363636',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '8px',
        ...style,
      }}
      {...restProps}
    />
  );
};
Toast.displayName = 'Toast';

const ToastTitle: React.FC<HTMLProps<HTMLParagraphElement>> = (props) => (
  <p
    style={{
      fontSize: '1rem',
      fontWeight: 600,
      color: 'inherit',
      textAlign: 'left',
      margin: 0,
    }}
    {...props}
  />
);
ToastTitle.displayName = 'ToastTitle';

const ToastDescription: React.FC<HTMLProps<HTMLParagraphElement>> = (props) => (
  <p
    style={{
      fontSize: '0.875rem',
      color: 'inherit',
      textAlign: 'left',
      margin: 0,
    }}
    {...props}
  />
);
ToastDescription.displayName = 'ToastDescription';

export { Toast, ToastTitle, ToastDescription, ToastViewport };
