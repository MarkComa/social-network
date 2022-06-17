import { usersAPI } from "../../api/api";
import { IUser } from "../../types/types";
import { ActionsType, AppDispatch } from "../redux-store";

const initialState = {
	users: [] as IUser[],
	pageSize: 15,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as (string | null)[],
};
type StateType = typeof initialState;

const usersReducer = (
	state = initialState,
	action: ActionsType<typeof actions>,
): StateType => {
	switch (action.type) {
		case "FOLLOW":
			return {
				...state,
				users: state.users.map((u) => {
					if (u.id === action.userId) {
						return { ...u, followed: true };
					}
					return u;
				}),
			};

		case "UNFOLLOW":
			return {
				...state,
				users: state.users.map((u) => {
					if (u.id === action.userId) {
						return { ...u, followed: false };
					}
					return u;
				}),
			};

		case "SET_USERS": {
			return { ...state, users: action.users };
		}
		case "SET_CURRENT_PAGE": {
			return { ...state, currentPage: action.currentPage };
		}
		case "SET_TOTAL_USERS_COUNT": {
			return { ...state, totalUsersCount: action.totalCount };
		}
		case "TOGGLE_IS_FETCHING": {
			return { ...state, isFetching: action.isFetching };
		}

		case "TOGGLE_FOLLOWING_PROGRESS": {
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(
							(id) => id !== action.userId,
					  ),
			};
		}

		default:
			return state;
	}
};

export const actions = {
	followSuccess: (userId: string | null) => ({ type: "FOLLOW", userId } as const),
	unfollowSuccess: (userId: string | null) => ({ type: "UNFOLLOW", userId } as const),
	setUsers: (users: IUser[]) => ({ type: "SET_USERS", users } as const),
	setCurrentPage: (currentPage: number) => ({
		type: "SET_CURRENT_PAGE",
		currentPage,
	} as const),
	setTotalUsersCount: (totalUsersCount: number) => ({
		type: "SET_TOTAL_USERS_COUNT",
		totalCount: totalUsersCount,
	} as const),
	toggleIsFetching: (isFetching: boolean) => ({
		type: "TOGGLE_IS_FETCHING",
		isFetching,
	} as const),
	toggleFollowingProgress: (isFetching: boolean, userId: string | null) => ({
		type: "TOGGLE_FOLLOWING_PROGRESS",
		isFetching,
		userId,
	} as const),
};

export const requestUsers = (pageSize: number, currentPage: number) => {
	return async (dispatch: AppDispatch) => {
		dispatch(actions.toggleIsFetching(true));
		const data = await usersAPI.getUsers(pageSize, currentPage);
		dispatch(actions.toggleIsFetching(false));
		dispatch(actions.setUsers(data.items));
		dispatch(actions.setTotalUsersCount(data.totalCount));
	};
};

export const follow = (userId: string | null) => {
	return async (dispatch: AppDispatch) => {
		dispatch(actions.toggleFollowingProgress(true, userId));
		const response = await usersAPI.follow(userId);
		if (response.data.resultCode === 0) {
			dispatch(actions.followSuccess(userId));
		}
		dispatch(actions.toggleFollowingProgress(false, userId));
	};
};

export const unfollow = (userId: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(actions.toggleFollowingProgress(true, userId));
		const response = await usersAPI.unfollow(userId);
		if (response.data.resultCode === 0) {
			dispatch(actions.unfollowSuccess(userId));
		}
		dispatch(actions.toggleFollowingProgress(false, userId));
	};
};
export default usersReducer;
