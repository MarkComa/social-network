import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { usersAPI, profileAPI } from "../../api/api";
import { PhotosType, ProfileType } from "../../types/types";
import { AppDispatch, RootState } from "../redux-store";
import { toggleIsFetching } from './usersSlice';


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
const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setUserProfile(state, action: PayloadAction<ProfileType>){
      state.profile = action.payload
    },
    setUserStatus(state, action: PayloadAction<string | null>){
      state.status = action.payload
    },
    saveAvatarSuccess(state, action: PayloadAction<PhotosType>){
      if (state.profile !== null)
      {state.profile.photos = action.payload}
    },
    setEditMode(state, action: PayloadAction<boolean>){
      state.isEditMode = action.payload
    } 
}})

export const {setUserProfile, setUserStatus, saveAvatarSuccess, setEditMode} = profileSlice.actions
export default profileSlice.reducer

export const getUserProfile = (userId: string | null) => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleIsFetching(true));
    const response = await usersAPI.getUsersProfile(userId);
    dispatch(toggleIsFetching(false));
    dispatch(setUserProfile(response.data));
  };
};

export const getUserStatus = (userId: string | null) => {
  return async (dispatch: AppDispatch) => {
    const response = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(response.data));
  };
};
export const saveAvatar = (file: File) => {
  return async (dispatch:AppDispatch) => {
    const response = await profileAPI.saveAvatar(file);
    if (response.data.resultCode === 0) {
      dispatch(saveAvatarSuccess(response.data.data.photos));
    }
    
  };
};

export const updateUserStatus = (status: string | null) => {
  return async (dispatch:AppDispatch) => {
    const response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  };
}; 

export const updateUserProfile = (data: ProfileType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.updateUserProfile(data);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
      dispatch(setEditMode(false))
    }
  };
};

