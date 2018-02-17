import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, hydrate } from 'react-dom';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import configureStore from '../store/configureStore';
import routes from '../routes';
import { convertCustomRouteConfig, ensureReady } from '../helpers/rrv4Helpers';

const renderFunc = process.env.NODE_ENV === 'production' ? hydrate : render;

const routeConfig = convertCustomRouteConfig(routes);

ensureReady(routeConfig).then(() => {
  const props = JSON.parse(document.getElementById('props').dataset.props); // eslint-disable-line
  const store = configureStore(props);
  renderFunc(
    <Provider store={store}>
      <BrowserRouter>{renderRoutes(routeConfig, props)}</BrowserRouter>
    </Provider>,
    document.getElementById('root') // eslint-disable-line
  );
});
