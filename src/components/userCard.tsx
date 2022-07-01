import { follow, unfollow } from "../redux/reducers/usersReducer";
import { useAppSelector } from "../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { IUser } from "../types/types";
import { Image, Card, Space, Row, Col, Typography } from "antd";
import { ToggleFollow } from "./toggleIsFollow";

interface UserCardProps {
	user: IUser;
}
const { Title } = Typography;

const UserCard = ({ user }: UserCardProps) => {
	const followingInProgress = useAppSelector(
		(state) => state.users.followingInProgress,
	);
	const isAuth = useAppSelector((state) => state.auth.isAuth);

	return (	
		<Space direction='vertical' size='middle' style={{ display: "flex" }}>
			<Card
				style={{ width: 230}}
				cover={
					<Row justify='center'>
						<Link to={`/profile/${user.id}`}>
							<Image
								width={150}
								src={
									user.photos.small != null
										? user.photos.small
										: "https://via.placeholder.com/90"
								}
							/>
						</Link>
					</Row>
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
				<Row>
					<div>
						<Col>
							<Title  level={5} style={{ margin: 0 }}>
								{user.name}
							</Title>
						</Col>
					</div>
				</Row>
			</Card>
		</Space>
	);
};
export default UserCard;
