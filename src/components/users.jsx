import React from "react";
import { NavLink } from "react-router-dom";
import style from "./blocks/users.module.css";

const Users = (props) => {
  let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  let currentPage = props.currentPage;

  return (
    <div className={style.users}>
      {props.users.map((u) => (
        <div key={u.id} className={style.user}>
          <div className={style.user__left}>
            <NavLink to={`/profile/${u.id}`}>
              <img
                className={style.user__avatar}
                src={
                  u.photos.small != null
                    ? u.photos.small
                    : "https://via.placeholder.com/90"
                }
                alt="avatar"
              />
            </NavLink>
            <div>
              {u.followed ? (
                <button
                  className={style.btn}
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className={style.btn}
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className={style.user__info}>
            <div className={style.fullname}>{u.name}</div>
            <div>{u.status}</div>

            <div>"u.location.country"</div>
            <div>"u.location.city"</div>
          </div>
        </div>
      ))}

      <div className={style.center}>
        {pages.map((p) => {
          if (
            (p < currentPage + 3 && p > currentPage - 3) ||
            p === 1 ||
            p === pages.length
          ) {
            return (
              <button
                className={style.btn__page}
                key={p}
                onClick={() => {
                  props.onPageChanged(p);
                }}
              >
                {p}
              </button>
            );
          } else return <></>;
        })}
      </div>
    </div>
  );
};

export default Users;
