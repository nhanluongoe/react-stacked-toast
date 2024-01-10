import { keyframes, styled } from 'goober';
import React from 'react';
import { Toast } from '../core/types';
import { Check, Close, Spinner, Warning } from './icons';

interface ToastIconProps {
  icon?: Toast['icon'];
  type: Toast['type'];
}

const enter = keyframes`
  from {
    transform: scale(0.6);
    opacity: 0.4;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const AnimatedIconWrapper = styled('div')`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${enter} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`;

const ToastIcon: React.FC<ToastIconProps> = (props) => {
  const { icon, type } = props;

  if (icon !== undefined) {
    return <AnimatedIconWrapper>{icon}</AnimatedIconWrapper>;
  }

  const renderIcon = () => {
    if (type === 'success') {
      return <Check />;
    }
    if (type === 'error') {
      return <Close />;
    }
    if (type === 'loading') {
      return <Spinner />;
    }
    if (type === 'warning') {
      return <Warning />;
    }
    return null;
  };

  return <AnimatedIconWrapper>{renderIcon()}</AnimatedIconWrapper>;
};

export default ToastIcon;
