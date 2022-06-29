import { follow, unfollow } from "../redux/reducers/usersReducer";
import { useAppSelector } from "../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { IUser } from "../types/types";
import { Image, Card, Space } from "antd";
import { ToggleFollow } from "./toggleIsFollow";

interface UserCardProps {
	user: IUser;
}

const UserCard = ({ user }: UserCardProps) => {
	const followingInProgress = useAppSelector(
		(state) => state.usersPage.followingInProgress,
	);
	const isAuth = useAppSelector((state) => state.auth.isAuth);

	return (
		<Space direction='vertical' size='middle' style={{ display: "flex" }}>
			<Card
				style={{ width: 200 }}
				cover={
					<Link to={`/profile/${user.id}`} >
						<Image
							width={150}
							
							src={
								user.photos.small != null
									? user.photos.small
									: "https://via.placeholder.com/90"
							}
						/>
					</Link>
				}
				actions={[
					<ToggleFollow
						follow={follow}
						unfollow={unfollow}
						isAuth={isAuth}
						user={user}
						followingInProgress={followingInProgress}
					/>,
				]}>
				<div>
					<div>
						<div>{user.name}</div>
						<div>{user.status}</div>
					</div>
				</div>
			</Card>
		</Space>
	);
};
export default UserCard;
