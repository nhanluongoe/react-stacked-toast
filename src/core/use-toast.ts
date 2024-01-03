// Inspired by react-hot-toast library
import * as React from 'react';
import { Toast, ToastOptionsWithoutType, ToasterType } from './types';
import { genId } from './utils';

const TOAST_LIMIT = 3;

type ActionType = {
  ADD_TOAST: 'ADD_TOAST';
  REMOVE_TOAST: 'REMOVE_TOAST';
  DISMISS_TOAST: 'DISMISS_TOAST';
};

type Action =
  | {
      toast: Toast;
      type: ActionType['ADD_TOAST'];
    }
  | {
      toastId?: Toast['id'];
      type: ActionType['DISMISS_TOAST'];
    }
  | {
      toastId?: Toast['id'];
      type: ActionType['REMOVE_TOAST'];
    };

interface State {
  toasts: Toast[];
}

const toastTimeouts = new Map<Toast['id'], ReturnType<typeof setTimeout>>();

export const TOAST_EXPIRE_DISMISS_DELAY = 1000;

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId,
    });
  }, TOAST_EXPIRE_DISMISS_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST': {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    }

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((t) => {
          addToRemoveQueue(t.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
              }
            : t
        ),
      };
    }
    case 'REMOVE_TOAST': {
      const { toastId } = action;

      if (toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      };
    }
    default:
      return state;
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

function createToast(
  type: ToasterType = 'default',
  opts: ToastOptionsWithoutType
): Toast {
  return {
    type,
    createdAt: Date.now(),
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
toast.error = (opts: ToastOptionsWithoutType) => createHandler('success')(opts);

toast.dismiss = (toastId?: string) => {
  dispatch({
    type: 'DISMISS_TOAST',
    toastId,
  });
};

const DEFAULT_DURATION = 5000;

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  React.useEffect(() => {
    const timeouts = state.toasts.map((t) => {
      if (t.duration === Infinity) {
        return;
      }

      const actualDuration =
        (t.duration || DEFAULT_DURATION) - (Date.now() - t.createdAt);

      if (actualDuration <= 0) {
        toast.dismiss(t.id);
        return;
      }

      return setTimeout(() => toast.dismiss(t.id), actualDuration);
    });

    return () =>
      timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
  }, [state.toasts]);

  return {
    ...state,
    toast,
    dismiss: toast.dismiss,
  };
}

export { toast, useToast };
