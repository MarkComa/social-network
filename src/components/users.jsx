import React from "react";
import style from "./blocks/users.module.css";
import Pagination from "./common/pagginator";
import User from "./user";

const Users = (props) => {

  return (
    <div className={style.users}>
      {props.users.map((u) => (
        <div key={u.id} className={style.user}>
          <div className={style.user__left}>
            {/* <NavLink to={`/profile/${u.id}`}>
              <img
                className={style.user__avatar}
                src={
                  u.photos.small != null
                    ? u.photos.small
                    : "https://via.placeholder.com/90"
                }
                alt="avatar"
              />
            </NavLink> */}
            <User id={u.id} name={u.name} photo={u.photos.small} status={u.status}/>
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
          {/* <div className={style.user__info}>
            <div className={style.fullname}>{u.name}</div>
            <div>{u.status}</div>
          </div> */}
        </div>
      ))}
      <Pagination currentPage={props.currentPage} onPageChanged={props.onPageChanged} totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}/>
    </div>
  );
};

export default Users;
