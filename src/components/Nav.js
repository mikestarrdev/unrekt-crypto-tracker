import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";

function Nav({ coinList }) {
  return (
    <nav className="nav-bar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/portfolio">Track Your Portfolio</NavLink>
      <NavLink to exact="/favorites">
        Your Favorites
      </NavLink>
    </nav>
  );
}

export default Nav;
