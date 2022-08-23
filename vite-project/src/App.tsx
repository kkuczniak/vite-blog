import { Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './config/routes';

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <Routes>
      {routes.map((route, index) => {
        return <Route key={index} path={route.path} element={route.element} />;
      })}
    </Routes>
  );
};

export default App;
