import React from "react";
import { NavLink } from "react-router-dom";
import style from "./blocks/userCard.module.css";
import {
	follow,
	unfollow,
} from "../redux/reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingInProgress, getIsAuth } from "../redux/selectors/user-selectors";

const UserCard = (props) => {
  const followingInProgress = useSelector((state) =>
		getFollowingInProgress(state),
	);
	const isAuth = useSelector((state) => getIsAuth(state));
  const dispatch = useDispatch()
  
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
      {isAuth ? (
        <div>
          {props.followed ? (
            <button
              className={style.btn}
              disabled={followingInProgress.some((id) => id === props.id)}
              onClick={() => {
                dispatch(unfollow(props.id))
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              className={style.btn}
              disabled={followingInProgress.some((id) => id === props.id)}
              onClick={() => {
                dispatch(follow(props.id))
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
