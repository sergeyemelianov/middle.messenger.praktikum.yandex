import store from '../../core/Store';

export const setError = (error?: string): void => {
  store.dispatch({
    type: 'ERROR',
    error: error || undefined,
  });
};
