import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user';
import IPageProps from '../interfaces/page';
import firebase from 'firebase';
import { SignInWithSocialMedia as SocialMediaPopup } from '../modules/auth';
import logging from '../config/logging';

const LoginPage: React.FunctionComponent<IPageProps> = (props) => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const isLogin = window.location.pathname.includes('login');

  const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== '') setError('');

    setAuthenticating(true);
    SocialMediaPopup(provider)
      .then(async (result) => {
        logging.info(result);
        let user = result.user;

        if (user) {
          let uid = user.uid;
          let name = user.displayName;

          if (name) {
            try {
              let fire_token = await user.getIdToken();
            } catch (error) {
              setError('Invalid token');
              logging.error(error);
              setAuthenticating(false);
            }
          } else {
            setError("Provider doesn't have a name.");
            setAuthenticating(false);
          }
        } else {
          setError(
            'The identity provider is missing a lot of the necessary information.'
          );
          setAuthenticating(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setAuthenticating(false);
      });
  };

  return <h1>hello Login</h1>;
};

export default LoginPage;
