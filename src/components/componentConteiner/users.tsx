import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	requestUsers,
	setCurrentPage,
} from "../../redux/reducers/usersReducer";
import {
	getUsers,
	getPageSize,
	getTotalUsersCount,
	getCurrentPage,
	getIsFetching,
} from "../../redux/selectors/user-selectors";
import style from "../blocks/users.module.css";
import Pagination from "../common/pagginator";
import UserCard from "../userCard";
import Preloader from "../preloader";
import { useEffect } from "react";

export const Users = () => {
	const isFetching = useSelector((state) => getIsFetching(state));
	const users = useSelector((state) => getUsers(state));
	const pageSize = useSelector((state) => getPageSize(state));
	const totalUsersCount = useSelector((state) => getTotalUsersCount(state));
	const currentPage = useSelector((state) => getCurrentPage(state));
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(requestUsers(pageSize, currentPage));
	}, []);

	const onPageChanged = (pageNumber) => {
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
					{users.map((u) => (
						<div key={u.id}>
							<UserCard
								id={u.id}
								name={u.name}
								photos={u.photos.small}
								status={u.status}
								followed={u.followed}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
