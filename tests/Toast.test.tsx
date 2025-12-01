import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import toast, { Toaster } from '../src';

beforeEach(() => {
  toast.remove();
  vi.useFakeTimers();
});

afterEach(() => {
  act(() => {
    vi.runAllTimers();
    vi.useRealTimers();
  });
});

it('renders success toast correctly', () => {
  render(<Toaster />);

  act(() => {
    toast.success({ title: 'Success!' });
  });

  expect(screen.getByText(/success/i)).toBeInTheDocument();
});

it('renders error toast correctly', () => {
  render(<Toaster />);

  act(() => {
    toast.error({ title: 'Error!' });
  });

  expect(screen.getByText(/error/i)).toBeInTheDocument();
});

it('renders warning toast correctly', () => {
  render(<Toaster />);

  act(() => {
    toast.warning({ title: 'Warning!' });
  });

  expect(screen.getByText(/warning/i)).toBeInTheDocument();
});

it('renders loading toast correctly', () => {
  render(<Toaster />);

  act(() => {
    toast.loading({ title: 'Loading' });
  });

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

it('renders stacked toasts correctly', () => {
  render(<Toaster />);

  act(() => {
    toast.success({ title: 'Success!' });
    toast.error({ title: 'Error!' });
    toast.warning({ title: 'Warning!' });
  });

  expect(screen.getByText(/success/i)).toBeInTheDocument();
  expect(screen.getByText(/error/i)).toBeInTheDocument();
  expect(screen.getByText(/warning/i)).toBeInTheDocument();
});

it('renders only 3 toasts stacking correctly', () => {
  render(<Toaster />);

  act(() => {
    toast.success({ title: 'Success!' });
    toast.error({ title: 'Error!' });
    toast.warning({ title: 'Warning!' });
    toast.loading({ title: 'Loading' });
  });

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(screen.getByText(/error/i)).toBeInTheDocument();
  expect(screen.getByText(/warning/i)).toBeInTheDocument();
  expect(screen.queryByText(/success/i)).not.toBeInTheDocument();
});

it('renders custom limit of toasts correctly', () => {
  render(<Toaster toastOptions={{ toastLimit: 4 }} />);

  act(() => {
    toast.success({ title: 'Success!' });
    toast.error({ title: 'Error!' });
    toast.warning({ title: 'Warning!' });
    toast.loading({ title: 'Loading' });
  });

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(screen.getByText(/error/i)).toBeInTheDocument();
  expect(screen.getByText(/warning/i)).toBeInTheDocument();
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});

it('renders toasts with custom icon correctly', () => {
  render(<Toaster />);

  act(() => {
    toast({ title: 'Success!', icon: <div>👍</div> });
  });

  expect(screen.getByText(/👍/i)).toBeInTheDocument();
});

it('pause toasts correctly', () => {
  render(<Toaster />);

  act(() => {
    toast({ title: 'hover' });
  });

  const toastElement = screen.getByText(/hover/i);
  expect(toastElement).toBeInTheDocument();

  fireEvent.mouseEnter(toastElement);
  act(() => {
    vi.advanceTimersByTime(60 * 1000);
  });
  expect(toastElement).toBeInTheDocument();

  fireEvent.mouseLeave(toastElement);
  act(() => {
    vi.advanceTimersByTime(5 * 1000);
  });
  expect(toastElement).not.toBeInTheDocument();
});
