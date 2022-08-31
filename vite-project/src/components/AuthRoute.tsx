import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import logging from '../config/logging';
import UserContext from '../context/user';

export interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;

  const userContext = useContext(UserContext);

  if (userContext.userState.user._id === '') {
    logging.info('Unauthorized, redirecting.');
    return <Navigate replace to='/login' />;
  } else {
    return <>{children}</>;
  }
};

export default AuthRoute;
