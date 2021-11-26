import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = (props) => {
  return (
    <div class="dashboard__body">
      <div class="dashboard__header">
        <h1 class="header-title">Overview</h1>
        <div class="header-activity">
          <button class="header-btn">
            <img src="assets/images/search.svg" alt="icon: search" />
          </button>
          <button class="header-btn header-btn--new">
            <img src="assets/images/bell.svg" alt="icon: notification" />
          </button>
          <div class="user-profile">
            <NavLink to="/" class="user-profile__avatar">
              <img src="assets/images/avatar.png" alt="avatar" />
            </NavLink>
            <button class="user-profile__nav-btn">
              <span class="user-profile__nav-name">Zoia M.</span>
              <img
                src="assets/images/arrow-down.svg"
                alt="icon:arrow"
                class="user-profile__nav-arrow"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
