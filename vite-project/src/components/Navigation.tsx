import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext, { initialUserState } from '../context/user';
import styles from '../styles/components/Navigation.module.scss';

export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

  const Logout = () => {
    userContext.userDispatch({ type: 'logout', payload: initialUserState });
  };
  return (
    <nav className={styles.nav}>
      <NavLink to='/'>
        <p>Game Vite</p>
      </NavLink>
      <div className={styles.leftNav}>
        {user._id === '' ? (
          <>
            <NavLink
              className={styles.glitch}
              data-glitch='Sign Up'
              to='/login'
            >
              Sign Up
            </NavLink>
            <NavLink
              className={styles.glitch}
              data-glitch='Sign In'
              to='/login'
            >
              Sign In
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className={styles.glitch} data-glitch='Posts' to='/posts'>
              Posts
            </NavLink>
            <button className={styles.glitch} onClick={() => Logout()}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
