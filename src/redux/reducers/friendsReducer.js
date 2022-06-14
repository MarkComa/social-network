import { usersAPI } from "../../api/api";

const SET_USERS = "friendsReducer/SET-USERS";

const initialState = {
  users: [],
  pageSize: 15,
  totalUsersCount: 0,
  currentPage: 1,
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    default:
      return state;
  }
};

export const setUsers = (users) => ({ type: SET_USERS, users });

export const requestFollowingUsers = (pageSize, currentPage) => {
  return async (dispatch) => {
    const data = await usersAPI.getUsers(pageSize, currentPage);
    dispatch(setUsers(data.items));
  };
};
export default friendsReducer;
