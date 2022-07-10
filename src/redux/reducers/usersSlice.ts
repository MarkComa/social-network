import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersAPI } from "../../api/api";
import { IUser } from "../../types/types";
import { AppDispatch } from "../redux-store";

const initialState = {
	users: [] as IUser[],
	friends: [] as IUser[],
	pageSize: 15,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as (string | null)[],
};
type StateType = typeof initialState;

const usersSlice = createSlice({
	name: "usersSlice",
	initialState,
	reducers: {
		followSuccess(state, action: PayloadAction<string | null>) {
			state.users.map((u) => {
				if (u.id === action.payload) {
					return (u.followed = true);
				}
			});
		},
		unfollowSuccess(state, action: PayloadAction<string | null>) {
			state.users.map((u) => {
				if (u.id === action.payload) {
					return (u.followed = false);
				}
			});
		},
		setUsers(state, action: PayloadAction<IUser[]>) {
			state.users = action.payload;
		},
		setFriends(state, action: PayloadAction<IUser[]>) {
			state.friends = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setTotalUsersCount(state, action: PayloadAction<number>) {
			state.totalUsersCount = action.payload;
		},
		toggleIsFetching(state, action: PayloadAction<boolean>) {
			state.isFetching = action.payload;
		},
		toggleFollowingProgress(
			state,
			action: PayloadAction<{
				isFetching: boolean;
				userId: string | null;
			}>,
		) {
			{
				state.followingInProgress = action.payload.isFetching
					? [...state.followingInProgress, action.payload.userId]
					: state.followingInProgress.filter(
							(id) => id !== action.payload.userId,
					  );
			}
		},
	},
});
export const {
	followSuccess,
	unfollowSuccess,
	setUsers,
	setFriends,
	setCurrentPage,
	setTotalUsersCount,
	toggleIsFetching,
	toggleFollowingProgress,
} = usersSlice.actions;
export default usersSlice.reducer

export const requestUsers = (
	pageSize: number,
	currentPage: number,
	friend: boolean | null = null,
) => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleIsFetching(true));
		const data = await (friend === null
			? usersAPI.getUsers(pageSize, currentPage)
			: usersAPI.getFriends(pageSize, currentPage, friend));
		dispatch(toggleIsFetching(false));
		dispatch(
			friend === null
				? setUsers(data.items)
				: setFriends(data.items),
		);
		dispatch(setTotalUsersCount(data.totalCount));
	};
};

export function follow(userId: string | null) {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleFollowingProgress({ isFetching: true, userId }));
		const response = await usersAPI.follow(userId);
		if (response.data.resultCode === 0) {
			dispatch(followSuccess(userId));
		}
		dispatch(toggleFollowingProgress({ isFetching: false, userId }));
	};
}

export function unfollow(userId: string) {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleFollowingProgress({ isFetching: true, userId }));
		const response = await usersAPI.unfollow(userId);
		if (response.data.resultCode === 0) {
			dispatch(unfollowSuccess(userId));
		}
		dispatch(toggleFollowingProgress({ isFetching: false, userId }));
	};
}
