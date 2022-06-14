import "./App.css";
import React from "react";
import NavbarСontainer from "./components/componentConteiner/navbarСontainer";
import DashboardContainer from "./components/componentConteiner/dashboardContainer";
import { BrowserRouter, Route } from "react-router-dom";
import { Users } from "./components/componentConteiner/users.tsx";
import Auth from "./components/auth";
import { initializeApp } from "./redux/reducers/appReducer";
import { connect } from "react-redux";
import Preloader from "./components/preloader";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import { withSuspense } from "./HOC/withSuspense";

const ChatContainer = React.lazy(() =>
	import("./components/componentConteiner/chatContainer"),
);
const FriendsContainer = React.lazy(() =>
	import("./components/componentConteiner/friendsContainer"),
);
const Profile = React.lazy(() =>
	import("./components/profile"),
);

class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader isFetching='true' />;
		}

		return (
			<div className='dashboard'>
				<NavbarСontainer />
				<Route
					path='/dialogs/:friendId?'
					render={withSuspense(ChatContainer)}
				/>
				<Route
					path='/friends'
					render={withSuspense(FriendsContainer)}
				/>
				<Route
					path='/dashboard'
					render={() => <DashboardContainer />}
				/>
				<Route path='/users' render={() => <Users />} />
				<Route
					path='/profile/:userId?'
					render={withSuspense(Profile)}
				/>
				<Route path='/login' render={() => <Auth />} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized,
	isFetching: state.usersPage.isFetching,
});

const AppContainer = connect(mapStateToProps, { initializeApp })(App);

const SamuraiJSApp = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</BrowserRouter>
	);
};
export default SamuraiJSApp;
