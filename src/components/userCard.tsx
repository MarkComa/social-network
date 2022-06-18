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
		<div>
			<div>
				<Link to={`/profile/${user.id}`}>
					<img
						src={
							user.photos.small != null
								? user.photos.small
								: "https://via.placeholder.com/90"
						}
						alt='avatar'
					/>
				</Link>
				<div>
					<div>{user.name}</div>
					<div>{user.status}</div>
				</div>
			</div>
			{isAuth ? (
				<div>
					{user.followed ? (
						<button
							disabled={followingInProgress.some(
								(id: string | null) => id === user.id,
							)}
							onClick={() => {
								dispatch(unfollow(user.id));
							}}>
							Unfollow
						</button>
					) : (
						<button
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
