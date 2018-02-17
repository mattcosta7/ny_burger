import fetch from 'isomorphic-fetch';
import { LOADING_TODOS, SET_TODOS, CLEAR_TODOS } from '../constants';

const todosRes = {
  todos: [
    {
      id: 'ed0bcc48-bbbe-5f06-c7c9-2ccb0456ceba',
      title: 'Wake Up.',
      completed: true,
    },
    {
      id: '42582304-3c6e-311e-7f88-7e3791caf88c',
      title: 'Grab a brush and put a little makeup.',
      completed: true,
    },
    {
      id: '036af7f9-1181-fb8f-258f-3f06034c020f',
      title: 'Write a blog post.',
      completed: false,
    },
    {
      id: '1cf63885-5f75-8deb-19dc-9b6765deae6c',
      title: 'Create a demo repository.',
      completed: false,
    },
    {
      id: '63a871b2-0b6f-4427-9c35-304bc680a4b7',
      title: '??????',
      completed: false,
    },
    {
      id: '63a871b2-0b6f-4422-9c35-304bc680a4b7',
      title: 'Profit.',
      completed: false,
    },
  ],
};

export function clearTodos() {
  return {
    type: CLEAR_TODOS,
  };
}

export function loadingTodos() {
  return {
    type: LOADING_TODOS,
  };
}

export function gotTodos(todos) {
  return {
    type: SET_TODOS,
    payload: {
      todos,
    },
  };
}

export function getTodos() {
  return (dispatch) => {
    dispatch(loadingTodos());
    Promise.resolve(todosRes).then((res) => {
      dispatch(gotTodos({
        todos: res.todos,
      }));
    });
  };
}
