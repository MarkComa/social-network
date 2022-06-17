import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dialogReducer from "./reducers/dialogReducer";
import friendsReducer from "./reducers/friendsReducer";
import usersReducer from "./reducers/usersReducer";
import profileReducer from "./reducers/profileReducer";
import authReducer from "./reducers/authReducer";
import { reducer as formReducer } from "redux-form";
import appReducer from "./reducers/appReducer";

const rootReducer = combineReducers({
	dialogPage: dialogReducer,
	friendsPage: friendsReducer,
	usersPage: usersReducer,
	profilePage: profileReducer,
	auth: authReducer,
	app: appReducer,
	form: formReducer,
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
