import { ActionsType } from './../redux-store';
import { actions } from "./usersReducer";
import { usersAPI, profileAPI } from "../../api/api";
import { PhotosType, ProfileType } from "../../types/types";
import { AppDispatch, RootState } from "../redux-store";


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

const profileReducer = (state = initialState, action: ActionsType<typeof actionsProfile>): ProfileState => {
  switch (action.type) {
    case "SET_USER_PROFILE": {
      return { ...state, profile: action.userProfile };
    }
    case "SET_USER_STATUS": {
      return { ...state, status: action.status };
    }
    case "SAVE_AVATAR_SUCCESS": {
      return { ...state,  profile: {...state.profile, photos: action.photos}  };
    }
    case "SET_EDIT_MODE": {
      return { ...state, isEditMode: action.isEdit };
    }

    default:
      return state;
  }
}

export const actionsProfile = {
 setUserProfile: (userProfile: ProfileType) => ({
  type: "SET_USER_PROFILE",
  userProfile,
} as const),
 setUserStatus: (status : string | null) => ({
  type: "SET_USER_STATUS",
  status,
} as const),
 saveAvatarSuccess: (photos: PhotosType) => ({
  type: "SAVE_AVATAR_SUCCESS",
  photos,
} as const),
 setEditMode: (isEdit: boolean) => ({
  type: "SET_EDIT_MODE",
  isEdit
} as const)}




export const getUserProfile = (userId: string | null) => {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.toggleIsFetching(true));
    const response = await usersAPI.getUsersProfile(userId);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actionsProfile.setUserProfile(response.data));
  };
};

export const getUserStatus = (userId: string | null) => {
  return async (dispatch: AppDispatch) => {
    const response = await profileAPI.getUserStatus(userId);
    dispatch(actionsProfile.setUserStatus(response.data));
  };
};
export const saveAvatar = (file: File) => {
  return async (dispatch:AppDispatch) => {
    const response = await profileAPI.saveAvatar(file);
    if (response.data.resultCode === 0) {
      dispatch(actionsProfile.saveAvatarSuccess(response.data.data.photos));
    }
    
  };
};

export const updateUserStatus = (status: string | null) => {
  return async (dispatch:AppDispatch) => {
    const response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(actionsProfile.setUserStatus(status));
    }
  };
}; 

export const updateUserProfile = (data: ProfileType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.updateUserProfile(data);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
      dispatch(actionsProfile.setEditMode(false))
    }
  };
};

export default profileReducer;
