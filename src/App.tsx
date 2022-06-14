import "./App.css";
import React, { useEffect } from "react";
import NavbarСontainer from "./components/componentConteiner/navbarСontainer";
import DashboardContainer from "./components/componentConteiner/dashboardContainer";
import { BrowserRouter, Route } from "react-router-dom";
import { Users } from "./components/users";
import Auth from "./components/auth";
import { initializeApp } from "./redux/reducers/appReducer";
import Preloader from "./components/preloader";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import { withSuspense } from "./HOC/withSuspense";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";

const ChatContainer = React.lazy(
	() => import("./components/componentConteiner/chatContainer"),
);
const FriendsContainer = React.lazy(
	() => import("./components/componentConteiner/friendsContainer"),
);
const Profile = React.lazy(() => import("./components/profile"));

export const App = ():JSX.Element => {
	const initialized = useAppSelector((state) => state.app.initialized);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initializeApp());
	}, []);

	if (!initialized) {
		return <Preloader isFetching='true' />;
	}

	return (
		<div className='dashboard'>
			<NavbarСontainer />
			<Route
				path='/dialogs/:friendId?'
				render={withSuspense(ChatContainer)}
			/>
			<Route path='/friends' render={withSuspense(FriendsContainer)} />
			<Route path='/dashboard' render={() => <DashboardContainer />} />
			<Route path='/users' render={() => <Users />} />
			<Route path='/profile/:userId?' render={withSuspense(Profile)} />
			<Route path='/login' render={() => <Auth />} />
		</div>
	);
};
const SamuraiJSApp = () => (
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
export default SamuraiJSApp;
