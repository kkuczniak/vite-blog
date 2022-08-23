import IRoute from '../interfaces/route';
import HomePage from '../pages/home';

const authRoutes: IRoute[] = [];

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
