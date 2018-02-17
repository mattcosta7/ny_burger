import { LOADING_TODOS, SET_TODOS, CLEAR_TODOS } from '../constants/todo';

const initialState = {
  loading: false,
  todos: [],
};

export default function todosReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOADING_TODOS:
      return {
        ...state,
        loading: true,
      };
    case SET_TODOS:
      return {
        ...state,
        loading: false,
        todos: payload.todos,
      };
    case CLEAR_TODOS:
      return {
        ...state,
        loading: false,
        todos: [],
      };
    default:
      return state;
  }
}
