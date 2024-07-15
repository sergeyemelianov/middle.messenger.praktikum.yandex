type Action = Record<string, any>;

type State = Record<string, any>;

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
  if (action.type === 'SET_TEXT') {
    console.log('state--->', state);
    console.log('action---->', action);
    newState.message = action.message;
    return newState;
  } else {
    return state;
  }
};

const state: State = {
  message: '',
};

// const setTextAction: Action = {
//   type: 'SET_TEXT',
//   message: '',
// };

const store = Object.freeze(createStore(reducer, state));

export default store;
