import Home from './containers/Home/index';
import Login from './containers/Login/index';

export default [
  {
    key: 'home',
    path: '/',
    exact: true,
    component: Home,
  },
  {
    key: 'login',
    path: '/login',
    exact: true,
    component: Login,
  },
];
