import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
	requestUsers,
	setCurrentPage,
} from "../redux/reducers/usersReducer";
import {
	getTotalUsersCount,
	getCurrentPage,
	getIsFetching,
} from "../redux/selectors/user-selectors";
import style from "./blocks/users.module.css";
import Pagination from "./common/pagginator";
import UserCard from "./userCard";
import Preloader from "./preloader";
import { useEffect } from "react";
import { IUser } from "../types/types";

export const Users = () => {
	const isFetching = useAppSelector((state) => getIsFetching(state));
	const users = useAppSelector((state) => state.usersPage.users);
	const pageSize = useAppSelector(state => state.usersPage.pageSize);
	const totalUsersCount = useAppSelector((state) => getTotalUsersCount(state));
	const currentPage = useAppSelector((state) => getCurrentPage(state));
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(requestUsers(pageSize, currentPage));
	}, []);

	const onPageChanged = (pageNumber: number) => {
		dispatch(setCurrentPage(pageNumber));
		dispatch(requestUsers(pageSize, pageNumber));
	};
	// Перенести лишние селекторы и диспатчи в компоненту userCard
	return (
		<>
			<Preloader isFetching={isFetching} />
			<div className={style.users__page}>
				<Pagination
					currentPage={currentPage}
					onPageChanged={onPageChanged}
					totalUsersCount={totalUsersCount}
					pageSize={pageSize}
				/>
				<div className={style.users}>
					{users.map((user:IUser) => (
						<div key={user.id}>
							<UserCard
								user={user}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
