// Inspired by react-hot-toast library
import * as React from 'react';
import { dispatch, useStore } from './store';
import {
  Toast,
  ToastArg,
  ToastOptions,
  ToasterType,
  ToastsOptions,
  isFunction,
} from './types';
import { genId } from './utils';

const DEFAULT_DURATION = 3 * 1000;

function createToast(type: ToasterType = 'default', arg: ToastArg): Toast {
  if (isFunction(arg)) {
    const id = genId();
    const createdAt = Date.now();
    const visible = true;

    const expectedToast = arg({
      type,
      createdAt,
      visible,
      id,
    });

    return {
      ...expectedToast,
      type,
      createdAt,
      visible,
      id,
    };
  }

  return {
    type,
    createdAt: Date.now(),
    visible: true,
    ...arg,
    id: arg.id || genId(),
  };
}

function createHandler(type?: ToasterType) {
  return (options: ToastArg) => {
    const toast = createToast(type, options);
    dispatch({
      type: 'UPSERT_TOAST',
      toast,
    });
    return toast.id;
  };
}

const toast = (opts: ToastArg) => createHandler('default')(opts);
toast.error = createHandler('error');
toast.success = createHandler('success');
toast.loading = createHandler('loading');
toast.warning = createHandler('warning');

toast.promise = <T>(
  promise: Promise<T>,
  content: {
    loading: ToastOptions;
    success: ToastOptions;
    error: ToastOptions;
  }
) => {
  const id = toast.loading(content.loading);
  promise
    .then((p) => {
      toast.success({ ...content.success, id });
      return p;
    })
    .catch(() => {
      toast.error({ ...content.error, id });
    });
  return promise;
};

toast.dismiss = (toastId?: string) => {
  dispatch({
    type: 'DISMISS_TOAST',
    toastId,
  });
};

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

function useToast(toastOptions: ToastsOptions = {}) {
  const { toasts, pausedAt, pauseDuration } = useStore(toastOptions);

  React.useEffect(() => {
    const timeouts = toasts.map((t) => {
      if (pausedAt) {
        return;
      }

      if (t.duration === Infinity) {
        return;
      }

      const durationLeft =
        (t.duration ?? DEFAULT_DURATION) +
        (pauseDuration ?? 0) -
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

export { pause, resume, toast, useToast };
