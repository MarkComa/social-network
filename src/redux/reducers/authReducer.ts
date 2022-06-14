import { AppDispatch } from './../redux-store';
import { AnyAction } from "@reduxjs/toolkit";
import { stopSubmit } from "redux-form";
import { authAPI } from "../../api/api";

const SET_AUTH_USER_DATA = "SET-AUTH-USER-DATA";
const SET_CAPTCHA = "SET-CAPTCHA";

const initialState = {
	userId: null as number | null,
	login: null as string | null,
	email: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null,
};
type StateType = typeof initialState;

const authReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case SET_AUTH_USER_DATA:
			return {
				...state,
				...action.payload,
			};
		case SET_CAPTCHA:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
export const setAuthUserData = (userId: string | null, login: string | null, email: string | null, isAuth: boolean) => ({
	type: SET_AUTH_USER_DATA,
	payload: { userId, login, email, isAuth },
});
export const setCaptcha = (captchaUrl:string) => ({
	type: SET_CAPTCHA,
	payload: { captchaUrl },
});

export const getAuth = () => {
	return async (dispatch: AppDispatch) => {
		const response = await authAPI.me();
		if (response.data.resultCode === 0) {
			const { id, login, email } = response.data.data;
			dispatch(setAuthUserData(id, login, email, true));
		}
	};
};

export const login = (email: string, password: string, rememberMe: boolean, captcha:string|null = null) => {
	return async (dispatch: AppDispatch) => {
		let response = await authAPI.login(
			email,
			password,
			rememberMe,
			captcha,
		);
		if (response.data.resultCode === 0) {
			dispatch(getAuth());
		} else {
			if (response.data.resultCode === 10) {
				dispatch(getCaptcha());
			}
			let message =
				response.data.messages.length > 0
					? response.data.messages[0]
					: "Some error";
			dispatch(stopSubmit("login", { _error: message }));
		}
	};
};

export const logout = () => {
	return async (dispatch: AppDispatch) => {
		let response = await authAPI.logout();
		if (response.data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false));
		}
	};
};
export const getCaptcha = () => {
	return async (dispatch: AppDispatch) => {
		let response = await authAPI.captcha();
		dispatch(setCaptcha(response.data.url));
	};
};

export default authReducer;
