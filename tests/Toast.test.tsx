import { act, render, screen } from '@testing-library/react';
import { beforeEach, expect, it, vitest } from 'vitest';
import toast, { Toaster } from '../src';
import React from 'react';

beforeEach(() => {
  toast.remove();
  vitest.useFakeTimers();
});

it('renders different types of toast correctly', () => {
  render(<Toaster />);

  act(() => {
    toast.success({ title: 'Success!' });
  });

  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
