import { hot } from 'react-hot-loader';

export default function hotReload(module, component) {
  if (process.env.NODE_ENV === 'production') return component;
  return hot(module)(component);
}
