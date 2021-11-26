import React from "react";
import { NavLink } from "react-router-dom";
import Login from "./login";

const Navbar = (props) => {
  return (
    <div className="dashboard__nav">
      <nav className="nav">
        <NavLink to="/dashboard">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            className="dashboard__logo"
          />
        </NavLink>

        <ul className="nav__item-top">
          <li className="nav__list-top">
            <NavLink to={"/profile/" + props.userIdMe}>
              <img src="/assets/images/user.svg" alt="user" />
            </NavLink>
          </li>

          <li className="nav__list-top">
            <NavLink to="/friends">
              <img src="/assets/images/cube.svg" alt="cube" />
            </NavLink>
          </li>

          <li className="nav__list-top">
            <NavLink to="/dashboard">
              <img src="/assets/images/dashboard.svg" alt="dashboard" />
            </NavLink>
          </li>
          <li className="nav__list-top">
            <NavLink to="/dialogs">
              <img src="/assets/images/wallet.svg" alt="wallet" />
            </NavLink>
          </li>
          <li className="nav__list-top">
            <NavLink to="/users">
              <img src="/assets/images/charts.svg" alt="charts" />
            </NavLink>
          </li>
        </ul>

        <ul className="nav__item-bottom">
          <Login isAuth={props.isAuth} login={props.login} />
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
