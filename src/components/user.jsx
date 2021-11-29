import React from "react";
import { NavLink } from "react-router-dom";
import style from "./blocks/users.module.css";

const User = (props) => {
    return <><NavLink to={`/profile/${props.id}`}>
              <img
                className={style.user__avatar}
                src={
                  props.photos != null
                    ? props.photos
                    : "https://via.placeholder.com/90"
                }
                alt="avatar"
              />
            </NavLink>
    <div className={style.user__info}>
            <div className={style.fullname}>{props.name}</div>
            <div>{props.status}</div>
    </div>
    </>

}
export default User