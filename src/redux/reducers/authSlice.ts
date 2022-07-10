import { AppDispatch } from "../redux-store";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stopSubmit } from "redux-form";
import { authAPI } from "../../api/api";

const SET_AUTH_USER_DATA = "SET-AUTH-USER-DATA";
const SET_CAPTCHA = "SET-CAPTCHA";

const initialState = {
	userId: null as string | null,
	login: null as string | null,
	email: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null,
};
type StateType = typeof initialState;
const authSlice = createSlice({
	name: "authSlice",
	initialState,
	reducers: {
		setAuthUserData(
			state,
			action: PayloadAction<{
				userId: string | null;
				login: string | null;
				email: string | null;
				isAuth: boolean;
			}>,
		) {
			state.userId = action.payload.userId;
			state.login = action.payload.login;
			state.email = action.payload.email;
			state.isAuth = action.payload.isAuth;
		},
		setCaptcha(state, action: PayloadAction<string | null>) {
			state.captchaUrl = action.payload;
		},
	},
});
export const {setAuthUserData, setCaptcha} = authSlice.actions
export default authSlice.reducer;


export const getAuth = () => {
	return async (dispatch: AppDispatch) => {
		const response = await authAPI.me();
		if (response.data.resultCode === 0) {
			const { id, login, email } = response.data.data;
			dispatch(setAuthUserData({userId: id, login, email, isAuth: true}));
		}
	};
};

export const login = (
	email: string,
	password: string,
	rememberMe: boolean,
	captcha: string | null = null,
) => {
	return async (dispatch: AppDispatch) => {
		const response = await authAPI.login(
			email,
			password,
			rememberMe,
			captcha,
		);
		if (response.data.resultCode === 0) {
			dispatch(getAuth());
			dispatch(setCaptcha(null));
		} else {
			if (response.data.resultCode === 10) {
				dispatch(getCaptcha());
			}
			const message =
				response.data.messages.length > 0
					? response.data.messages[0]
					: "Some error";
			dispatch(stopSubmit("login", { _error: message }));
		}
	};
};

export const logout = () => {
	return async (dispatch: AppDispatch) => {
		const response = await authAPI.logout();
		if (response.data.resultCode === 0) {
			dispatch(setAuthUserData({userId: null, login: null, email: null, isAuth: false}))
		}
	};
};
export const getCaptcha = () => {
	return async (dispatch: AppDispatch) => {
		const response = await authAPI.captcha();
		dispatch(setCaptcha(response.data.url));
	};
};