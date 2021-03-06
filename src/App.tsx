import "./App.css";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import Dashboard from "./components/dashboard";
import { Link, Route } from "react-router-dom";
import { Users } from "./components/users";
import { Auth } from "./components/auth";
import { initializeApp } from "./redux/reducers/appReducer";
import Preloader from "./components/preloader";
import { withSuspense } from "./HOC/withSuspense";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import loginIcon from "./assets/images/login.svg";
import logoutIcon from "./assets/images/logout.svg";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { logout } from "./redux/reducers/authSlice";
import { Login } from "./components/login";
import { Header } from "antd/lib/layout/layout";
import { User } from "./components/user";
import { profile } from "console";

const Chat1 = React.lazy(() => import("./components/chat"));
const Chat = React.lazy(() => import("./components/pages/chat"));
const FriendsList = React.lazy(() => import("./components/friendsList"));
const Profile = React.lazy(() => import("./components/profile"));

type MenuItem = Required<MenuProps>["items"][number];

export const App: React.FC = () => {
	const initialized = useAppSelector((state) => state.app.initialized);
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const login = useAppSelector((state) => state.auth.login);
	const userName = useAppSelector(
		(state) => state.profilePage.profile?.fullName,
	);
	const [collapsed, setCollapsed] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initializeApp());
	}, []);
	const { Content, Sider } = Layout;

	function getItem(
		label: React.ReactNode,
		key: React.Key,
		icon?: React.ReactNode,
		children?: MenuItem[],
	): MenuItem {
		return {
			key,
			icon,
			children,
			label,
		} as MenuItem;
	}
	if (!initialized) {
		return <Preloader isFetching={true} />;
	}

	const items: MenuItem[] = [
		getItem(<Link to={"/profile"}>??????????????</Link>, "1", <UserOutlined />),
		getItem(<Link to={"/users"}>??????????????????????</Link>, "2", <TeamOutlined />),
		getItem(<Link to={"/friends"}>????????????????</Link>, "3", <TeamOutlined />),
		getItem(<Link to={"/chat"}>??????</Link>, "4", <TeamOutlined />),
		getItem(
			<Login isAuth={isAuth} logout={logout} />,
			"5",
			<img
				width='10'
				height='10'
				src={isAuth ? logoutIcon : loginIcon}
				alt='icon'
			/>,
		),
	];

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}>
				<div className='logo' />
				<Menu theme='dark' mode='inline' items={items}></Menu>
			</Sider>
			<Layout className='site-layout'>
				<Header>
					<User login={login} />
				</Header>
				<Content style={{ margin: "0 16px" }}>
					<div
						className='site-layout-background'
						style={{ padding: 24, minHeight: 360 }}>
						<Route
							path='/dialogs/:friendId?'
							render={withSuspense(Chat1)}
						/>
						<Route
							path='/friends'
							render={withSuspense(FriendsList)}
						/>
						<Route
							path='/chat'
							render={withSuspense(Chat)}
						/>
						<Route path='/dashboard' render={() => <Dashboard />} />
						<Route path='/users' render={() => <Users />} />
						<Route
							path='/profile/:userId?'
							render={withSuspense(Profile)}
						/>
						<Route path='/login' render={() => <Auth />} />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};
