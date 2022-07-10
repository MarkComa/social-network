import { Col, Row } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { requestUsers, setCurrentPage } from "../redux/reducers/usersSlice";
import { IUser } from "../types/types";
import Pagination from "./common/pagginator";
import UserCard from "./userCard";

const FriendsList = () => {
	const pageSize = useAppSelector((state) => state.users.pageSize);
	const currentPage = useAppSelector((state) => state.users.currentPage);
	const friends = useAppSelector((state) => state.users.friends);
	const totalUsersCount = useAppSelector(
		(state) => state.users.totalUsersCount,
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		onRequestUsers()
	}, []);
	useEffect(()=>{
		onRequestUsers()
	},[friends, totalUsersCount])

	const onRequestUsers = () => {
		dispatch(requestUsers(pageSize, currentPage, true));
	};
	const onPageChanged = (pageNumber: number) => {
		dispatch(setCurrentPage(pageNumber));
		dispatch(requestUsers(pageSize, pageNumber));
	};

	return (
		<section>
			<h1>Мои Друзья</h1>
			<Pagination
				currentPage={currentPage}
				onPageChanged={onPageChanged}
				totalUsersCount={totalUsersCount}
				pageSize={pageSize}
			/>
			<Row justify='center' align='middle' gutter={[15, 10]}>
				{friends.map((user: IUser) => (
					<div key={user.id}>
						<Col span={4}>
							<UserCard user={user} />
						</Col>
					</div>
				))}
			</Row>
		</section>
	);
};

export default FriendsList;
