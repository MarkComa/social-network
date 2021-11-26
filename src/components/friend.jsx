import React from "react";
import { NavLink } from "react-router-dom";

const Friend = (props) => {
  return (
    <NavLink className="friend" to={`/friend/${props.id}`}>
      <img width="100" src={props.avatar} alt="avatar" />
      <h2>
        {props.name} {props.fname}
      </h2>
    </NavLink>
  );
};
export default Friend;
