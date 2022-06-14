import { toggleIsFetching } from "./usersReducer";
import { usersAPI, profileAPI } from "../../api/api";
import { PhotosType, ProfileType } from "../../types/types";
import { AppDispatch, RootState } from "../redux-store";
import { AnyAction } from "@reduxjs/toolkit";

const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";
const SAVE_AVATAR_SUCCESS = "SAVE-AVATAR-SUCCESS"
const SET_EDIT_MODE = "SET-EDIT-MODE"

interface ProfileState {
  profile: ProfileType | null,
  status: string | null,
  aboutMe: string,
  isEditMode: boolean,
}

const initialState: ProfileState = {
  profile: null,
  status: null,
  aboutMe: "",
  isEditMode: false,
};

const profileReducer = (state = initialState, action: AnyAction) => {
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
      return { ...state, isEditMode: !state.isEditMode };
    }

    default:
      return state;
  }
};

export const setUserProfile = (userProfile: ProfileType) => ({
  type: SET_USER_PROFILE,
  userProfile,
});

export const setUserStatus = (status : string) => ({
  type: SET_USER_STATUS,
  status,
});

export const saveAvatarSuccess = (photos: PhotosType) => ({
  type: SAVE_AVATAR_SUCCESS,
  photos,
});
export const setEditMode = () => ({
  type: SET_EDIT_MODE
});




export const getUserProfile = (userId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await usersAPI.getUsersProfile(userId);
    dispatch(toggleIsFetching(false));
    dispatch(setUserProfile(response.data));
  };
};

export const getUserStatus = (userId: string) => {
  return async (dispatch: AppDispatch) => {
    let response = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(response.data));
  };
};
export const saveAvatar = (file: File) => {
  return async (dispatch:AppDispatch) => {
    let response = await profileAPI.saveAvatar(file);
    if (response.data.resultCode === 0) {
      dispatch(saveAvatarSuccess(response.data.data.photos));
    }
    
  };
};

export const updateUserStatus = (status: string) => {
  return async (dispatch:AppDispatch) => {
    let response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  };
}; 

export const updateUserProfile = (data: ProfileType) => {
  return async (dispatch: any, getState: () => RootState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.updateUserProfile(data);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
      dispatch(setEditMode())
    }
  };
};

export default profileReducer;
