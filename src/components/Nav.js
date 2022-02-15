import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav-bar">
      <NavLink to="/">Home</NavLink>
      <NavLink to exact="/favorites">
        Favorites
      </NavLink>
      <NavLink to exact="/track">
        Track Your Portfolio
      </NavLink>
      {/* <a href="/favorites">Your Favorites</a>
      <a href="/track">Track your portfolio</a> */}
    </nav>
  );
}

export default Nav;
