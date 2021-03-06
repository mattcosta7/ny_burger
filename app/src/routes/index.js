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
          loader: () => import('../containers/Home/'),
        }),
      },
      {
        path: parentRoute => `${parentRoute}/burgers`,
        component: generateAsyncRouteComponent({
          loader: () => import('../containers/Burgers'),
        }),
        routes: [
          {
            path: parentRoute => `${parentRoute}/`,
            exact: true,
            component: generateAsyncRouteComponent({
              loader: () => import('../components/Burgers'),
            }),
          },
          {
            path: parentRoute => `${parentRoute}/:burger_id`,
            exact: true,
            component: generateAsyncRouteComponent({
              loader: () => import('../containers/Burger'),
            }),
          },
        ],
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
