import IRoute from '../interfaces/route';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';

const authRoutes: IRoute[] = [
  {
    path: '/login',
    name: 'Login',
    auth: false,
    element: LoginPage,
  },
];

const blogRoutes: IRoute[] = [];

const mainRoutes: IRoute[] = [
  {
    path: '/',
    name: 'Home',
    auth: false,
    element: HomePage,
  },
];

const routes: IRoute[] = [...authRoutes, ...blogRoutes, ...mainRoutes];

export default routes;
