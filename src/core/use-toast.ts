// Inspired by react-hot-toast library
import * as React from 'react';
import { Toast, ToastOptionsWithoutType, ToasterType } from './types';
import { genId } from './utils';
import { dispatch, useStore } from './store';

function createToast(
  type: ToasterType = 'default',
  opts: ToastOptionsWithoutType
): Toast {
  return {
    type,
    createdAt: Date.now(),
    visible: true,
    ...opts,
    id: opts.id || genId(),
  };
}

function createHandler(type?: ToasterType) {
  return (options: ToastOptionsWithoutType) => {
    const toast = createToast(type, options);
    dispatch({
      type: 'ADD_TOAST',
      toast,
    });
    return toast.id;
  };
}

const toast = (opts: ToastOptionsWithoutType) => createHandler('default')(opts);
toast.error = (opts: ToastOptionsWithoutType) => createHandler('error')(opts);
toast.success = (opts: ToastOptionsWithoutType) =>
  createHandler('success')(opts);

toast.dismiss = (toastId?: string) => {
  dispatch({
    type: 'DISMISS_TOAST',
    toastId,
  });
};

const DEFAULT_DURATION = 1000;

const pause = () => {
  dispatch({
    type: 'PAUSE',
    time: Date.now(),
  });
};

const resume = () => {
  dispatch({
    type: 'RESUME',
    time: Date.now(),
  });
};

function useToast() {
  const { toasts, pausedAt, pauseDuration } = useStore();

  React.useEffect(() => {
    const timeouts = toasts.map((t) => {
      if (pausedAt) {
        return;
      }

      if (t.duration === Infinity) {
        return;
      }

      const durationLeft =
        (t.duration || DEFAULT_DURATION) +
        (pauseDuration || 0) -
        (Date.now() - t.createdAt);

      if (durationLeft <= 0) {
        if (t.visible) {
          toast.dismiss(t.id);
        }
        return;
      }

      return setTimeout(() => {
        toast.dismiss(t.id);
      }, durationLeft);
    });

    return () => {
      timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
    };
  }, [toasts, pausedAt, pauseDuration]);

  return {
    toasts,
    toast,
    dismiss: toast.dismiss,
  };
}

export { toast, useToast, pause, resume };
