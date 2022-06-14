import { AnyAction } from '@reduxjs/toolkit';
import { usersAPI } from "../../api/api";
import { IUser } from '../../types/types';
import { AppDispatch } from "../redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE-FOLLOWING-PROGRESS";



const initialState = {
  users: [] as IUser[],
  pageSize: 15,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as string[],
};
type StateType = typeof initialState

const usersReducer = (state = initialState, action:AnyAction):StateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };

    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.totalCount };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }

    case TOGGLE_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }

    default:
      return state;
  }
};

export const followSuccess = (userId: string | null) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId: string | null) => ({ type: UNFOLLOW, userId });
export const setUsers = (users:IUser[]) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage: number) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUsersCount = (totalUsersCount:number) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount: totalUsersCount,
});
export const toggleIsFetching = (isFetching:boolean) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleFollowingProgress = (isFetching:boolean, userId: string | null) => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const requestUsers = (pageSize:number, currentPage:number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(pageSize, currentPage);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

export const follow = (userId: string | null) => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    const response = await usersAPI.follow(userId);
    if (response.data.resultCode === 0) {
      dispatch(followSuccess(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
  };
};

export const unfollow = (userId: string) => {
  return async (dispatch:AppDispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    const response = await usersAPI.unfollow(userId);
    if (response.data.resultCode === 0) {
      dispatch(unfollowSuccess(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
  };
};
export default usersReducer;
