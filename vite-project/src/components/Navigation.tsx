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
        <NavLink to='/posts'>Posts</NavLink>
        <NavLink to='/login'>Sign In</NavLink>
        <NavLink to='/login'>Sign Up</NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
