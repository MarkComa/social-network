import { stopSubmit } from "redux-form";
import { authAPI } from "../../api/api";

const SET_AUTH_USER_DATA = "SET-AUTH-USER-DATA";
const SET_CAPTCHA = "SET-CAPTCHA";

let initialState = {
	userId: null,
	login: null,
	email: null,
	isAuth: false,
	captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
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
export const setAuthUserData = (userId, login, email, isAuth) => ({
	type: SET_AUTH_USER_DATA,
	payload: { userId, login, email, isAuth },
});
export const setCaptcha = (captchaUrl) => ({
	type: SET_CAPTCHA,
	payload: { captchaUrl },
});

export const getAuth = () => {
	return async (dispatch) => {
		let response = await authAPI.me();
		if (response.data.resultCode === 0) {
			let { id, login, email } = response.data.data;
			dispatch(setAuthUserData(id, login, email, true));
		}
	};
};

export const login = (email, password, rememberMe, captcha = null) => {
	return async (dispatch) => {
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
	return async (dispatch) => {
		let response = await authAPI.logout();
		if (response.data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false));
		}
	};
};
export const getCaptcha = () => {
	return async (dispatch) => {
		let response = await authAPI.captcha();
		dispatch(setCaptcha(response.data.url));
	};
};

export default authReducer;
