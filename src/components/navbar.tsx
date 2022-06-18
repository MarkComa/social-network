import React from "react";
import { NavLink } from "react-router-dom";
import {Login} from "./login";
import logo from "../assets/images/logo.svg";
import user from "../assets/images/user.svg";
import cube from "../assets/images/cube.svg";
import dashboard from "../assets/images/dashboard.svg";
import charts from "../assets/images/charts.svg";
import wallet from "../assets/images/wallet.svg";
import { useAppSelector } from "../redux/hooks/hooks";
import { logout } from "../redux/reducers/authReducer";

const Navbar = () => {
  const isAuth =  useAppSelector(state => state.auth.isAuth)
  const login = useAppSelector(state => state.auth.login)

  return (
    <div className="dashboard__nav">
      <nav className="nav">
        <NavLink to="/dashboard">
          <img src={logo} alt="logo" className="dashboard__logo" />
        </NavLink>

        <ul className="nav__item-top">
          <li className="nav__list-top">
            <NavLink to={"/profile"}>
              <img src={user} alt="user" />
            </NavLink>
          </li>

          <li className="nav__list-top">
            <NavLink to="/friends">
              <img src={cube} alt="cube" />
            </NavLink>
          </li>

          <li className="nav__list-top">
            <NavLink to="/dashboard">
              <img src={dashboard} alt="dashboard" />
            </NavLink>
          </li>
          <li className="nav__list-top">
            <NavLink to="/dialogs">
              <img src={wallet} alt="wallet" />
            </NavLink>
          </li>
          <li className="nav__list-top">
            <NavLink to="/users">
              <img src={charts} alt="charts" />
            </NavLink>
          </li>
        </ul>

        <ul className="nav__item-bottom">
          <Login isAuth={isAuth} login={login} logout={logout}/>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;