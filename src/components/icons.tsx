import React from 'react';
import { keyframes, styled } from 'goober';

const StyledCheck = styled('i')`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 30px;
    height: 30px;
    border: 2px solid transparent;
    border-radius: 100px;
    color: #61d345;
    border-color: #61d345;
  }
  &::after {
    color: #61d345;
    border-color: #61d345;
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    left: 4px;
    top: -1px;
    width: 9px;
    height: 15px;
    border-width: 0 3px 3px 0;
    border-style: solid;
    transform-origin: bottom left;
    transform: rotate(45deg);
  }
`;
export const Check: React.FC = () => {
  return <StyledCheck />;
};

const StyledClose = styled('i')`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 30px;
    height: 30px;
    border: 2px solid transparent;
    border-radius: 40px;
    color: #ff4b4b;
    border: 2px solid red;
    border-radius: 9999px;
  }
  &::after,
  &::before {
    color: ##ff4b4b;
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 20px;
    height: 3px;
    background: currentColor;
    transform: rotate(45deg);
    top: 12px;
    left: 3px;
  }
  &::after {
    transform: rotate(-45deg);
  }
`;
export const Close: React.FC = () => {
  return <StyledClose />;
};

const spinnerTwoAltAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const StyledSpinner = styled('i')`
  position: relative;
  &,
  &::before {
    box-sizing: border-box;
    display: block;
    width: 30px;
    height: 30px;
  }
  &::before {
    content: '';
    position: absolute;
    border-radius: 100px;
    animation: ${spinnerTwoAltAnimation} 1s cubic-bezier(0.6, 0, 0.4, 1)
      infinite;
    border: 3px solid #5fbdff;
    border-bottom-color: transparent;
    border-top-color: transparent;
  }
`;
export const Spinner: React.FC = () => {
  return <StyledSpinner />;
};

const StyledWarning = styled('i')`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 30px;
    height: 30px;
    border: 2px solid;
    border-radius: 40px;
    color: #f6d776;
  }
  &::after,
  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    border-radius: 3px;
    width: 3px;
    background: currentColor;
    left: 11.5px;
    color: #f6d776;
  }
  &::after {
    top: 4px;
    height: 14px;
  }
  &::before {
    height: 3px;
    bottom: 3px;
    width: 3px;
    border-radius: 9999px;
  }
`;
export const Warning: React.FC = () => {
  return <StyledWarning />;
};
