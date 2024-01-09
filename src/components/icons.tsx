import React from 'react';
import { styled } from 'goober';

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
