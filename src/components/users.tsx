import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { requestUsers, actionsUsers } from "../redux/reducers/usersReducer";
import Pagination from "./common/pagginator";
import UserCard from "./userCard";
import Preloader from "./preloader";
import { useEffect } from "react";
import { IUser } from "../types/types";
import { Col, Row } from "antd";

export const Users = () => {
	const isFetching = useAppSelector((state) => state.usersPage.isFetching);
	const users = useAppSelector((state) => state.usersPage.users);
	const pageSize = useAppSelector((state) => state.usersPage.pageSize);
	const totalUsersCount = useAppSelector(
		(state) => state.usersPage.totalUsersCount,
	);
	const currentPage = useAppSelector((state) => state.usersPage.currentPage);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(requestUsers(pageSize, currentPage));
	}, []);

	const onPageChanged = (pageNumber: number) => {
		dispatch(actionsUsers.setCurrentPage(pageNumber));
		dispatch(requestUsers(pageSize, pageNumber));
	};
	// Перенести лишние селекторы и диспатчи в компоненту userCard
	return (
		<>
			<Preloader isFetching={isFetching} />
			<div>
				<Row justify='center'>
					<Pagination
						currentPage={currentPage}
						onPageChanged={onPageChanged}
						totalUsersCount={totalUsersCount}
						pageSize={pageSize}
					/>
				</Row>
				<Row justify='start' align='middle' gutter={[15, 15]}>
					{users.map((user: IUser) => (
						<div key={user.id}>
							<Col>
								<UserCard user={user} />
							</Col>
						</div>
					))}
				</Row>
			</div>
		</>
	);
};
