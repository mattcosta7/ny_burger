import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import configureStore from '../store/configureStore';
import routes from '../routes';
import { convertCustomRouteConfig, ensureReady } from '../helpers/rrv4Helpers';

const routeConfig = convertCustomRouteConfig(routes);

export default function render(location, props) {
  const store = configureStore(props);
  return ensureReady(routeConfig, location).then(() => (
    <Provider store={store}>
      <StaticRouter context={{}} location={location}>
        {renderRoutes(routeConfig, props)}
      </StaticRouter>
    </Provider>
  ));
}
