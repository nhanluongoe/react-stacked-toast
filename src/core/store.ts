import React from 'react';
import { Toast } from './types';

type ActionType = {
  ADD_TOAST: 'ADD_TOAST';
  REMOVE_TOAST: 'REMOVE_TOAST';
  DISMISS_TOAST: 'DISMISS_TOAST';
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

export const TOAST_EXPIRE_DISMISS_DELAY = 10;
const TOAST_LIMIT = 3;

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

      // ! Side effects ! - This could be execrated into a dismissToast() action, but I'll keep it here for simplicity
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

export const useStore = () => {
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

  return {
    ...state,
  };
};
