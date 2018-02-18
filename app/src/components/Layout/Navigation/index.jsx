import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import burgerMain from '../../../assets/favicon/android-chrome-144x144.png';
import Styles from './styles.scss';

const NavItem = ({ to, children, active }) => (
  <li>
    <NavLink to={to}>{children}</NavLink>
  </li>
);

function Navigation() {
  return (
    <nav className={Styles['navigation-container']}>
      <ul className={Styles.navigation}>
        <NavItem to="/">
          <div className={Styles['burger-container']}>
            <img src={burgerMain} alt="burger" />
          </div>
        </NavItem>
        <NavItem to="/burgers">Burgers</NavItem>
        <NavItem to="/team">Team</NavItem>
      </ul>
    </nav>
  );
}

export default withRouter(Navigation);
