import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { requestUsers, actionsUsers } from "../redux/reducers/usersReducer";
import Pagination from "./common/pagginator";
import UserCard from "./userCard";
import Preloader from "./preloader";
import { useEffect } from "react";
import { IUser } from "../types/types";
import { Col, Row, Space } from "antd";

export const Users = () => {
	const isFetching = useAppSelector((state) => state.users.isFetching);
	const users = useAppSelector((state) => state.users.users);
	const pageSize = useAppSelector((state) => state.users.pageSize);
	const totalUsersCount = useAppSelector(
		(state) => state.users.totalUsersCount,
	);
	const currentPage = useAppSelector((state) => state.users.currentPage);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(requestUsers(pageSize, currentPage));
	}, [totalUsersCount]);
	

	const onPageChanged = (pageNumber: number) => {
		dispatch(actionsUsers.setCurrentPage(pageNumber));
		dispatch(requestUsers(pageSize, pageNumber));
	};
	// Перенести лишние селекторы и диспатчи в компонент userCard
	return (
		<>
			<Preloader isFetching={isFetching} />
			<div>
				<Space direction='vertical' size='middle'>
					<Row justify='center'>
						<Pagination
							currentPage={currentPage}
							onPageChanged={onPageChanged}
							totalUsersCount={totalUsersCount}
							pageSize={pageSize}
						/>
					</Row>
					<Row justify='center' align='middle' gutter={[15, 10]}>
						{users.map((user: IUser) => (
							<div key={user.id}>
								<Col span={4}>
									<UserCard user={user} />
								</Col>
							</div>
						))}
					</Row>
				</Space>
			</div>
		</>
	);
};
