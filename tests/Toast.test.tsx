import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import toast, { Toaster } from '../src';

let now = 1000;

const advanceToastTime = (ms: number) => {
  now += ms;
  vi.advanceTimersByTime(ms);
};

beforeEach(() => {
  cleanup();
  toast.remove();
  now = 1000;
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  vi.spyOn(Date, 'now').mockImplementation(() => now);
});

afterEach(() => {
  toast.remove();
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
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

it('updates every mounted toaster from the shared store', () => {
  render(
    <>
      <Toaster />
      <Toaster />
    </>
  );

  act(() => {
    toast.success({
      title: 'Shared toast',
      duration: Infinity,
    });
  });

  expect(screen.getAllByText(/shared toast/i)).toHaveLength(2);
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

  act(() => {
    fireEvent.mouseEnter(toastElement);
  });
  act(() => {
    advanceToastTime(60 * 1000);
  });
  expect(toastElement).toBeInTheDocument();

  act(() => {
    fireEvent.mouseLeave(toastElement);
  });
  act(() => {
    advanceToastTime(5 * 1000);
  });
  expect(toastElement).not.toBeInTheDocument();
});

it('removes a toast after dismissing an updated toast with the same id', () => {
  render(<Toaster />);

  act(() => {
    toast.loading({
      id: 'same-toast',
      title: 'Working',
      duration: Infinity,
    });
  });

  expect(screen.getByText(/working/i)).toBeInTheDocument();

  act(() => {
    toast.dismiss('same-toast');
    advanceToastTime(500);
    toast.success({
      id: 'same-toast',
      title: 'Done',
      duration: Infinity,
    });
    advanceToastTime(1000);
  });

  expect(screen.getByText(/done/i)).toBeInTheDocument();

  act(() => {
    toast.dismiss('same-toast');
    advanceToastTime(1000);
  });

  expect(screen.queryByText(/done/i)).not.toBeInTheDocument();
});

it('preserves duration across multiple pauses', () => {
  render(<Toaster />);

  act(() => {
    toast({
      title: 'Multiple pauses',
      duration: 3000,
    });
  });

  const toastElement = screen.getByText(/multiple pauses/i);

  act(() => {
    advanceToastTime(1000);
  });
  act(() => {
    fireEvent.mouseEnter(toastElement);
  });
  act(() => {
    advanceToastTime(1000);
  });
  act(() => {
    fireEvent.mouseLeave(toastElement);
  });
  act(() => {
    advanceToastTime(1000);
  });
  act(() => {
    fireEvent.mouseEnter(toastElement);
  });
  act(() => {
    advanceToastTime(1000);
  });
  act(() => {
    fireEvent.mouseLeave(toastElement);
  });
  act(() => {
    advanceToastTime(999);
  });

  expect(toastElement).toBeInTheDocument();

  act(() => {
    advanceToastTime(1001);
  });

  expect(toastElement).not.toBeInTheDocument();
});
