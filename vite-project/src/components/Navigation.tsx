import { NavLink } from 'react-router-dom';
import styles from '../styles/components/Navigation.module.scss';

export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
  return (
    <nav className={styles.nav}>
      <NavLink to='/'>
        <p>Game Vite</p>
      </NavLink>
      <div className={styles.leftNav}>
        <NavLink className={styles.glitch} data-glitch='Posts' to='/posts'>
          Posts
        </NavLink>
        <NavLink className={styles.glitch} data-glitch='Sign Up' to='/login'>
          Sign Up
        </NavLink>
        <NavLink className={styles.glitch} data-glitch='Sign In' to='/login'>
          Sign In
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
