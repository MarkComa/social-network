import { ActionsType, AppDispatch } from "./../redux-store";
import { IUser } from "./../../types/types";
import { usersAPI } from "../../api/api";

const initialState = {
	users: [] as IUser[],
	pageSize: 15,
	totalUsersCount: 0,
	currentPage: 1,
};
type StateType = typeof initialState;

const friendsReducer = (
	state = initialState,
	action: ActionsType<typeof actions>,
): StateType => {
	switch (action.type) {
		case "SET_USERS" : {
			return {
				...state,
				users: action.users,
			};
		}
		default:
			return state;
	}
};

const actions = {
	setUsers: (users: IUser[]) => ({ type: "SET_USERS", users }),
};

export const requestFollowingUsers = (
	pageSize: number,
	currentPage: number,
) => {
	return async (dispatch: AppDispatch) => {
		const data = await usersAPI.getUsers(pageSize, currentPage);
		dispatch(actions.setUsers(data.items));
	};
};
export default friendsReducer;
