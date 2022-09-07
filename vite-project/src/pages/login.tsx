import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user';
import IPageProps from '../interfaces/page';
import firebase from 'firebase';
import {
  Authenticate,
  SignInWithSocialMedia as SocialMediaPopup,
} from '../modules/auth';
import logging from '../config/logging';
import { Providers } from '../config/firebase';
import styles from '../styles/login.module.scss';

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
              Authenticate(uid, name, fire_token, (error, _user) => {
                if (error) {
                  setError(error);
                  setAuthenticating(false);
                } else if (_user) {
                  userContext.userDispatch({
                    type: 'login',
                    payload: { user: _user, fire_token },
                  });
                  navigate('/');
                }
              });
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

  return (
    <div className={styles.loginContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <span></span>
          <div className='flex'> Connection established</div>
          <span></span>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.spanFlex}>
          <span>\\\\\\\\\\\\</span>
          <span>////////////</span>
        </div>
        <p className={styles.welcomeText}>
          <strong>Welcome to Game Vite</strong> - the high-quality game blog
          with a soul. Please push the button for authorization with your google
          account.
        </p>
        <div className={styles.googleInfo}>
          Connect with{' '}
          <div className='div'>
            <svg
              viewBox='0 0 24 24'
              width='24'
              height='24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g transform='matrix(1, 0, 0, 1, 27.009001, -39.238998)'>
                <path
                  fill='#f0030d'
                  d='M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z'
                />
                <path
                  fill='#f0030d'
                  d='M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z'
                />
                <path
                  fill='#f0030d'
                  d='M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z'
                />
                <path
                  fill='#f0030d'
                  d='M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z'
                />
              </g>
            </svg>
          </div>
        </div>
        <button
          className={styles.loginButton}
          onClick={() => SignInWithSocialMedia(Providers.google)}
        >
          Login
        </button>
        <div className={styles.spanFlex}>
          <span>\\\\\\\\\\\\</span>
          <span>////////////</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
