import React from "react";
import style from "./blocks/userCard.module.css";
import { follow, unfollow } from "../redux/reducers/usersReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { IUser } from "../types/types";

interface UserCardProps {
	user: IUser;
}

const UserCard = ({ user }: UserCardProps) => {
	const followingInProgress = useAppSelector(
		(state) => state.usersPage.followingInProgress,
	);
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const dispatch = useAppDispatch();

	return (
		<div className={style.user}>
			<div>
				<Link to={`/profile/${user.id}`}>
					<img
						className={style.user__avatar}
						src={
							user.photos.small != null
								? user.photos.small
								: "https://via.placeholder.com/90"
						}
						alt='avatar'
					/>
				</Link>
				<div className={style.user__info}>
					<div className={style.fullname}>{user.name}</div>
					<div>{user.status}</div>
				</div>
			</div>
			{isAuth ? (
				<div>
					{user.followed ? (
						<button
							className={style.btn}
							disabled={followingInProgress.some(
								(id: string) => id === user.id,
							)}
							onClick={() => {
								dispatch(unfollow(user.id));
							}}>
							Unfollow
						</button>
					) : (
						<button
							className={style.btn}
							disabled={followingInProgress.some(
								(id) => id === user.id,
							)}
							onClick={() => {
								dispatch(follow(user.id));
							}}>
							Follow
						</button>
					)}
				</div>
			) : null}
		</div>
	);
};
export default UserCard;
