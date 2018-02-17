import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Style from './styles.scss';

const NavItem = ({ to, children, active }) => (
  <li className={classnames(Style['nav-item'], active && Style.active)}>
    <Link to={to}>{children}</Link>
  </li>
);

function Navigation({ location }) {
  return (
    <nav>
      <ul className={Style.nav}>
        <NavItem to="/" active={location.pathname === '/'}>
          Home
        </NavItem>
        <NavItem to="/code" active={location.pathname === '/code'}>
          Code
        </NavItem>
        <NavItem to="/photos" active={location.pathname.includes('/photos')}>
          Photos
        </NavItem>
      </ul>
    </nav>
  );
}

export default withRouter(Navigation);
