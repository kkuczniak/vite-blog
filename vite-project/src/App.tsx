import React, { useEffect, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import logging from './config/logging';
import routes from './config/routes';
import {
  initialUserState,
  UserContextProvider,
  userReducer,
} from './context/user';
import { Validate } from './modules/auth';

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState<boolean>(true);

  // debugging
  const [authStage, setAuthStage] = useState<string>(
    'Checking local storage ... '
  );

  useEffect(() => {
    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);
  }, []);

  const CheckLocalStorageForCredentials = () => {
    setAuthStage('Checking credentials ... ');

    const fire_token = localStorage.getItem('fire_token');

    if (fire_token === null) {
      userDispatch({ type: 'logout', payload: initialUserState });
      setAuthStage('No credentials found');
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      return Validate(fire_token, (error, user) => {
        if (error) {
          logging.error(error);
          setAuthStage('User not found');
          userDispatch({ type: 'logout', payload: initialUserState });
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else if (user) {
          setAuthStage('User authenticated');
          userDispatch({ type: 'login', payload: { user, fire_token } });
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      });
    }
  };
  const userContextValues = {
    userState,
    userDispatch,
  };

  if (loading) {
    return <h1>{authStage}</h1>;
  }
  //TODO loading animation: ;

  return (
    <UserContextProvider value={userContextValues}>
      <Routes>
        {routes.map((route, index) => {
          if (route.auth) {
            <AuthRoute>
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            </AuthRoute>;
          }
          return (
            <Route key={index} path={route.path} element={<route.element />} />
          );
        })}
      </Routes>
    </UserContextProvider>
  );
};

export default App;
