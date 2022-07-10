import { AnyAction } from '@reduxjs/toolkit';
import { AppDispatch } from './../redux-store';
import { getAuth } from "./authSlice";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

const initialState = {
  initialized: false,
};
type StateType = {
  initialized: boolean
}

const appReducer = (state = initialState, action: AnyAction): StateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
});

export const initializeApp = () => (dispatch: AppDispatch) => {
  const promise = dispatch(getAuth());
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
