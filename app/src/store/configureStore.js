import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      typeof window !== 'undefined' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
