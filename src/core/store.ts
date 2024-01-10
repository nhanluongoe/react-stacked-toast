import React from 'react';
import { Toast, ToastsOptions } from './types';

export const TOAST_EXPIRE_DISMISS_DELAY = 1000;
const TOAST_LIMIT = 3;

type ActionType = {
  ADD_TOAST: 'ADD_TOAST';
  REMOVE_TOAST: 'REMOVE_TOAST';
  DISMISS_TOAST: 'DISMISS_TOAST';
  UPSERT_TOAST: 'UPSERT_TOAST';
  UPDATE_TOAST: 'UPDATE_TOAST';
  PAUSE: 'PAUSE';
  RESUME: 'RESUME';
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
    };

interface State {
  toasts: Toast[];
  pausedAt: number | undefined;
  pauseDuration: number | undefined;
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
      return {
        ...state,
        pausedAt: action.time,
      };
    }

    case 'RESUME': {
      const pauseDuration = action.time - (state.pausedAt || 0);
      return {
        ...state,
        pausedAt: undefined,
        pauseDuration,
      };
    }

    default:
      return state;
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = {
  toasts: [],
  pausedAt: undefined,
  pauseDuration: undefined,
};

export function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export const useStore = (toastOptions: ToastsOptions = {}) => {
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
