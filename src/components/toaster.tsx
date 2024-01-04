import { useEffect, useState } from 'react';
import { pause, resume, useToast } from '../core/use-toast';
import { Toast, ToastDescription, ToastTitle, ToastViewport } from './toast';
import ToastIcon from './toast-icon';

interface ToasterProps {
  position?: 'left' | 'center' | 'right';
}

export function Toaster(props: ToasterProps) {
  const { position = 'right' } = props;

  const { toasts } = useToast();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (toasts.length === 0) {
      setCollapsed(true);
    }
  }, [toasts]);

  const handleMouseEnter = () => {
    pause();
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    resume();
    setCollapsed(true);
  };

  return (
    <ToastViewport
      position={position}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {toasts.map(({ id, title, description, type, icon }, index) => (
        <Toast key={id} idx={index} collapsed={collapsed.toString()}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <ToastIcon type={type} icon={icon} />
            </div>

            <div>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
          </div>
        </Toast>
      ))}
    </ToastViewport>
  );
}
