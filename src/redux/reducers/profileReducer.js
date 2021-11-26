import { toggleIsFetching } from "../../redux/reducers/usersReducer";
import { usersAPI, profileAPI } from "../../api/api";

let SET_USER_PROFILE = "SET-USER-PROFILE";
let SET_USER_STATUS = "SET-USER-STATUS";

let initialState = {
  profile: null,
  status: null,
  aboutMe: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE: {
      return { ...state, profile: action.userProfile };
    }
    case SET_USER_STATUS: {
      return { ...state, status: action.status };
    }

    default:
      return state;
  }
};

export const setUserProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  userProfile,
});

export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});

export const getUserProfile = (userId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));

    usersAPI.getUsersProfile(userId).then((response) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUserProfile(response.data));
    });
  };
};

export const getUserStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getUserStatus(userId).then((response) => {
      dispatch(setUserStatus(response.data));
    });
  };
};

export const updateUserStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateUserStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
      }
    });
  };
};

export default profileReducer;
