import React from 'react';
import { Toast, ToastsOptions } from './types';

export const TOAST_EXPIRE_DISMISS_DELAY = 1000;

type ActionType = {
  ADD_TOAST: 'ADD_TOAST';
  REMOVE_TOAST: 'REMOVE_TOAST';
  DISMISS_TOAST: 'DISMISS_TOAST';
  UPSERT_TOAST: 'UPSERT_TOAST';
  UPDATE_TOAST: 'UPDATE_TOAST';
  PAUSE: 'PAUSE';
  RESUME: 'RESUME';
  UPDATE_TOAST_LIMIT: 'UPDATE_TOAST_LIMIT';
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
    }
  | {
      type: ActionType['UPSERT_TOAST'];
      toast: Toast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<Toast>;
    }
  | {
      type: ActionType['PAUSE'];
      time: number;
    }
  | {
      type: ActionType['RESUME'];
      time: number;
    }
  | {
      type: ActionType['UPDATE_TOAST_LIMIT'];
      toastLimit: number;
    };

export interface State {
  toasts: Toast[];
  pausedAt: number | undefined;
  toastLimit?: number;
}

const toastTimeouts = new Map<Toast['id'], ReturnType<typeof setTimeout>>();

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

const clearFromRemoveQueue = (toastId: string) => {
  const timeout = toastTimeouts.get(toastId);
  if (timeout) {
    clearTimeout(timeout);
  }
  toastTimeouts.delete(toastId);
};

const clearRemoveQueue = () => {
  toastTimeouts.forEach((timeout) => {
    clearTimeout(timeout);
  });
  toastTimeouts.clear();
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST': {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, state.toastLimit),
      };
    }

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                visible: false,
              }
            : t
        ),
      };
    }

    case 'REMOVE_TOAST': {
      const { toastId } = action;

      if (toastId === undefined) {
        clearRemoveQueue();
        return {
          ...state,
          toasts: [],
        };
      }

      clearFromRemoveQueue(toastId);
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      };
    }

    case 'UPSERT_TOAST':
      const { toast } = action;
      return state.toasts.find((t) => t.id === toast.id)
        ? reducer(state, { type: 'UPDATE_TOAST', toast })
        : reducer(state, { type: 'ADD_TOAST', toast });

    case 'UPDATE_TOAST': {
      if (action.toast.id) {
        clearFromRemoveQueue(action.toast.id);
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    }

    case 'PAUSE': {
      if (state.pausedAt !== undefined) {
        return state;
      }

      return {
        ...state,
        pausedAt: action.time,
      };
    }

    case 'RESUME': {
      if (state.pausedAt === undefined) {
        return state;
      }

      const pauseDuration = action.time - state.pausedAt;
      return {
        ...state,
        pausedAt: undefined,
        toasts: state.toasts.map((toast) => ({
          ...toast,
          createdAt: toast.createdAt + pauseDuration,
        })),
      };
    }

    case 'UPDATE_TOAST_LIMIT': {
      return {
        ...state,
        toastLimit: action.toastLimit,
      };
    }

    default:
      return state;
  }
};

const listeners: Array<() => void> = [];

let memoryState: State = {
  toasts: [],
  pausedAt: undefined,
  toastLimit: 3,
};

const subscribe = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

const getSnapshot = () => memoryState;

// React 18+ uses the built-in hook; React 17 falls back to the same
// subscribe/snapshot contract so the peer dependency range remains supported.
const useStoreSnapshot: typeof React.useSyncExternalStore =
  React.useSyncExternalStore ??
  ((subscribeToStore, getStoreSnapshot) => {
    const [state, setState] = React.useState(getStoreSnapshot);

    React.useEffect(() => {
      return subscribeToStore(() => {
        setState(getStoreSnapshot());
      });
    }, [getStoreSnapshot, subscribeToStore]);

    return state;
  });

export function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener();
  });
}

export const useStore = (toastOptions: ToastsOptions = {}): State => {
  const state = useStoreSnapshot(subscribe, getSnapshot, getSnapshot);

  React.useEffect(() => {
    dispatch({
      type: 'UPDATE_TOAST_LIMIT',
      toastLimit: toastOptions.toastLimit ?? 3,
    });
  }, [toastOptions.toastLimit]);

  const mergedToasts = state.toasts.map((t) => ({
    ...toastOptions,
    ...t,
    duration: t.duration ?? toastOptions?.duration,
    style: {
      ...toastOptions.style,
      ...t.style,
    },
  }));

  return {
    ...state,
    toasts: mergedToasts,
  };
};
