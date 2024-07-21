import { UserResponse } from '../shared/interfaces/UserResponse';

type Action = Record<string, any>;

export type State = {
  user?: UserResponse;
};

type Reducer = (state: State, action: Action) => State;

type Subscriber = (state: State) => void;

const createStore = (reducer: Reducer, initialState: State) => {
  const subscribers: Subscriber[] = [];
  let currentState: State = initialState;

  return {
    getState: (): State => currentState,
    subscribe: (fn: Subscriber) => {
      subscribers.push(fn);
      fn(currentState);
    },
    dispatch: (action: Action) => {
      currentState = reducer(currentState, action);
      subscribers.forEach((fn) => fn(currentState));
    },
  };
};

const deepCopy = <T>(object: T): T => JSON.parse(JSON.stringify(object));

const reducer: Reducer = (state, action) => {
  const newState = deepCopy(state);
  console.log('state--->', state);
  console.log('action---->', action);
  switch (action.type) {
    case 'USER_INFO':
      newState.user = action.user;
      return newState;
    default:
      return state;
  }
};

const state: State = {
  user: undefined,
};

// const setTextAction: Action = {
//   type: 'SET_TEXT',
//   message: '',
// };

const store = Object.freeze(createStore(reducer, state));

export default store;
