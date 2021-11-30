import { usersAPI } from "../../api/api";

let SET_USERS = "SET-USERS";

let initialState = {
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
        users: action.users.filter(action.users.followed === true),
      };
    }
    default:
      return state;
  }
};

export const setUsers = (users) => ({ type: SET_USERS, users });

export const requestFollowingUsers = (pageSize, currentPage) => {
  return async (dispatch) => {
    let data = await usersAPI.getUsers(pageSize, currentPage);
    dispatch(setUsers(data.items));
  };
};
export default friendsReducer;
