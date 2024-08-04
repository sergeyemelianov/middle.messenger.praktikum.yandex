import store, { ActionType } from '../../core/Store';

export const setError = (error?: string): void => {
  store.dispatch({
    type: ActionType.ERROR,
    error: error || undefined,
  });
};
