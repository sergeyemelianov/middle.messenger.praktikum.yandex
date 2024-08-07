import { UserResponse } from '../shared/interfaces/UserResponse';
import { ChatsResponse } from '../shared/interfaces/ChatsResponse';

type Action = Record<string, any>;

export type State = {
  user?: UserResponse;
  chats?: ChatsResponse[];
  activeChatId?: number;
  messages?: ChatsResponse[];
  error?: string;
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
    case 'CHATS':
      newState.chats = action.chats;
      return newState;
    case 'ACTIVE_CHAT':
      newState.activeChatId = action.id;
      return newState;
    case 'CURRENT_CHAT':
      newState.messages = action.messages;
      return newState;
    case 'ERROR':
      newState.error = action.error;
      return newState;
    default:
      return state;
  }
};

export const initState: State = {
  user: undefined,
  chats: undefined,
  activeChatId: undefined,
  messages: undefined,
  error: undefined,
};

export enum ActionType {
  USER_INFO = 'USER_INFO',
  CHATS = 'CHATS',
  ACTIVE_CHAT = 'ACTIVE_CHAT',
  CURRENT_CHAT = 'CURRENT_CHAT',
  ERROR = 'ERROR',
}

// const setTextAction: Action = {
//   type: 'SET_TEXT',
//   message: '',
// };

const store = Object.freeze(createStore(reducer, initState));

export default store;
