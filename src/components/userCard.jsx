import React from "react";
import { NavLink } from "react-router-dom";
import style from "./blocks/userCard.module.css";

const UserCard = (props) => {
  return (
    <div className={style.user}>
      <div>
        <NavLink to={`/profile/${props.id}`}>
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
      </div>
      {props.isAuth ? (
        <div>
          {props.followed ? (
            <button
              className={style.btn}
              disabled={props.followingInProgress.some((id) => id === props.id)}
              onClick={() => {
                props.unfollow(props.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              className={style.btn}
              disabled={props.followingInProgress.some((id) => id === props.id)}
              onClick={() => {
                props.follow(props.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};
export default UserCard;
