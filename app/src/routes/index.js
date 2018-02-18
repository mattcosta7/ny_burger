import React from 'react';
import App from '../containers/App';
import { generateAsyncRouteComponent } from '../helpers/rrv4Helpers';

export default [
  {
    component: App,
    path: parentRoute => `${parentRoute}/`,
    routes: [
      {
        path: parentRoute => `${parentRoute}/`,
        exact: true,
        component: generateAsyncRouteComponent({
          loader: () => Promise.resolve(() => <div>parent</div>), // import("./all-todos")
        }),
      },
      {
        path: parentRoute => `${parentRoute}/team`,
        component: generateAsyncRouteComponent({
          loader: () => import('../containers/Team'),
        }),
        routes: [
          {
            path: parentRoute => `${parentRoute}/:paramName`,
            component: generateAsyncRouteComponent({
              loader: () => import('../containers/TeamMember'),
            }),
          },
        ],
      },
    ],
  },
];
