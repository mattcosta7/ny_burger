import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const NavItem = ({ to, children, active }) => (
  <li>
    <NavLink to={to}>{children}</NavLink>
  </li>
);

function Navigation() {
  return (
    <nav>
      <ul>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/burgers">Burgers</NavItem>
        <NavItem to="/team">Team</NavItem>
      </ul>
    </nav>
  );
}

export default withRouter(Navigation);
