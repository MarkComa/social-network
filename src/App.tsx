import "./App.css";
import React, { useEffect } from "react";
import Dashboard from "./components/dashboard";
import { Route } from "react-router-dom";
import { Users } from "./components/users";
import { Auth } from "./components/auth";
import { initializeApp } from "./redux/reducers/appReducer";
import Preloader from "./components/preloader";
import { withSuspense } from "./HOC/withSuspense";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import Navbar from "./components/navbar";

const Chat = React.lazy(() => import("./components/chat"));
const FriendsList = React.lazy(() => import("./components/friendsList"));
const Profile = React.lazy(() => import("./components/profile"));

export const App = (): JSX.Element => {
	const initialized = useAppSelector((state) => state.app.initialized);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initializeApp());
	}, []);

	if (!initialized) {
		return <Preloader isFetching={true} />;
	}

	return (
		<div className='dashboard'>
			<Navbar />
			<Route path='/dialogs/:friendId?' render={withSuspense(Chat)} />
			<Route path='/friends' render={withSuspense(FriendsList)} />
			<Route path='/dashboard' render={() => <Dashboard />} />
			<Route path='/users' render={() => <Users />} />
			<Route path='/profile/:userId?' render={withSuspense(Profile)} />
			<Route path='/login' render={() => <Auth />} />
		</div>
	);
};
