import React from "react";
import { Route, NavLink, Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav-bar">
      <Link to="/">Home</Link>
      <Link to exact="/portfolio">
        Track Your Portfolio
      </Link>
      <a href="/favorites">Your Favorites</a>
    </nav>
  );
}

export default Nav;
