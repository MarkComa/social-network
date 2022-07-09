import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dialogReducer from "./reducers/dialogReducer";
import usersReducer from "./reducers/usersReducer";
import profileReducer from "./reducers/profileReducer";
import authReducer from "./reducers/authReducer";
import { reducer as formReducer } from "redux-form";
import appReducer from "./reducers/appReducer";
import chatSlice from "./reducers/chatSlice";

const rootReducer = combineReducers({
	dialogPage: dialogReducer,
	users: usersReducer,
	profilePage: profileReducer,
	auth: authReducer,
	app: appReducer,
	form: formReducer,
	chat: chatSlice
});

const store = configureStore({
	reducer: rootReducer,
});

//Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

//types action
export type ActionsType<T extends { [key: string]: (...arg: any) => any }> =
	ReturnType<T extends { [key: string]: infer U } ? U : never>;

export default store;
