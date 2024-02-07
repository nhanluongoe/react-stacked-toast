import styled from '@emotion/styled';
import React, { CSSProperties, HTMLAttributes } from 'react';
import { ReactChildren } from '../core/types';
import { keyframes } from '@emotion/react';

interface ToastViewportProps {
  position: 'left' | 'center' | 'right';
  children: ReactChildren;
}

const StyledToastViewport = styled('ul')`
  position: fixed;
  z-index: 3600;
  display: flex;
  max-height: 100vh;
  padding: 8px;
  top: 8px;
  flex-direction: column;
  max-width: 420px;
`;

const ToastViewport: React.FC<
  ToastViewportProps & HTMLAttributes<HTMLUListElement>
> = (props) => {
  const { position, children, style, ...restProps } = props;
  const positionStyle = calculatePosition(position);

  return (
    <StyledToastViewport
      style={{
        ...style,
        ...positionStyle,
      }}
      {...restProps}
    >
      {children}
    </StyledToastViewport>
  );
};
ToastViewport.displayName = 'ToastViewport';

function calculatePosition(
  position: ToastViewportProps['position']
): CSSProperties {
  const positions = {
    left: { left: '16px' },
    right: { right: '16px' },
    center: { left: '50%', transform: 'translateX(-50%)' },
  };

  return positions[position];
}

interface ToastProps {
  visible?: boolean;
  collapsed?: string;
  idx?: number;
  style?: CSSProperties;
  className?: string;
  children: ReactChildren;
}

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;
const StyledToast = styled('li')`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: content-fit;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.35s cubic-bezier(0.06, 0.71, 0.55, 1.275);
  background: #fff;
  color: #363636;
  border-radius: 8px;
  line-height: 1.3;
  padding: 16px;
  margin-bottom: 8px;
  animation: ${(props: ToastProps) => (props.visible ? fadeIn : fadeOut)} 0.4s
    forwards cubic-bezier(0.06, 0.71, 0.55, 1);
`;

const Toast: React.FC<ToastProps> = (props) => {
  const {
    collapsed,
    idx,
    style = {},
    children,
    className = '',
    visible,
  } = props;
  const animationStyle = calculateAnimationStyle(idx!, collapsed!);

  return (
    <StyledToast
      style={{
        ...animationStyle,
        ...style,
      }}
      className={className}
      visible={visible}
    >
      {children}
    </StyledToast>
  );
};
Toast.displayName = 'Toast';

function calculateAnimationStyle(
  idx: number,
  collapsed: string
): CSSProperties {
  const transformValue =
    collapsed === 'true'
      ? `scaleX(${1 - idx! * 0.05}) translateY(${-idx! * 95}%)`
      : 'none';
  return {
    zIndex: 5500 - idx!,
    transform: transformValue,
  };
}

const ToastTitle = styled('div')`
  font-size: 1rem;
  font-weight: 600;
  color: inherit;
  text-align: left;
  margin: 0;
`;
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = styled('div')`
  font-size: 0.875rem;
  color: inherit;
  text-align: left;
  margin: 0;
`;
ToastDescription.displayName = 'ToastDescription';

export { Toast, ToastDescription, ToastTitle, ToastViewport };
