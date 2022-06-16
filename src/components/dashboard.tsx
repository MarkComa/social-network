import React from "react";
import { NavLink } from "react-router-dom";

//Пустой абсолютно не наполненый и не стилизованый блок (взятый из старой верстки в будующем наполнится)

const Dashboard = () => {
  return (
    <div className="dashboard__body">
      <div className="dashboard__header">
        <h1 className="header-title">Overview</h1>
        <div className="header-activity">
          <button className="header-btn">
            <img src="assets/images/search.svg" alt="icon: search" />
          </button>
          <button className="header-btn header-btn--new">
            <img src="assets/images/bell.svg" alt="icon: notification" />
          </button>
          <div className="user-profile">
            <NavLink to="/" className="user-profile__avatar">
              <img src="assets/images/avatar.png" alt="avatar" />
            </NavLink>
            <button className="user-profile__nav-btn">
              <span className="user-profile__nav-name">Zoia M.</span>
              <img
                src="assets/images/arrow-down.svg"
                alt="icon:arrow"
                className="user-profile__nav-arrow"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
