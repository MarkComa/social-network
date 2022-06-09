import { toggleIsFetching } from "../../redux/reducers/usersReducer";
import { usersAPI, profileAPI } from "../../api/api";

const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";
const SAVE_AVATAR_SUCCESS = "SAVE-AVATAR-SUCCESS"
const SET_EDIT_MODE = "SET-EDIT-MODE"

let initialState = {
  profile: null,
  status: null,
  aboutMe: "",
  editMode: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE: {
      return { ...state, profile: action.userProfile };
    }
    case SET_USER_STATUS: {
      return { ...state, status: action.status };
    }
    case SAVE_AVATAR_SUCCESS: {
      return { ...state,  profile: {...state.profile, photos: action.photos}  };
    }
    case SET_EDIT_MODE: {
      return { ...state, editMode: !state.editMode };
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

export const saveAvatarSuccess = (photos) => ({
  type: SAVE_AVATAR_SUCCESS,
  photos,
});
export const setEditMode = () => ({
  type: SET_EDIT_MODE
});


export const getUserProfile = (userId) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await usersAPI.getUsersProfile(userId);
    dispatch(toggleIsFetching(false));
    dispatch(setUserProfile(response.data));
  };
};

export const getUserStatus = (userId) => {
  return async (dispatch) => {
    let response = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(response.data));
  };
};
export const saveAvatar = (file) => {
  return async (dispatch) => {
    let response = await profileAPI.saveAvatar(file);
    if (response.data.resultCode === 0) {
      dispatch(saveAvatarSuccess(response.data.data.photos));
    }
    
  };
};

export const updateUserStatus = (status) => {
  return async (dispatch) => {
    let response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  };
};

export default profileReducer;
