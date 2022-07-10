import { NavLink } from "react-router-dom";
import { Login } from "./login";
import logo from "../assets/images/logo.svg";
import user from "../assets/images/user.svg";
import cube from "../assets/images/cube.svg";
import dashboard from "../assets/images/dashboard.svg";
import charts from "../assets/images/charts.svg";
import wallet from "../assets/images/wallet.svg";
import { useAppSelector } from "../redux/hooks/hooks";
import { logout } from "../redux/reducers/authSlice";

const Navbar = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const login = useAppSelector((state) => state.auth.login);

	return (
		<div>
			<nav>
				<NavLink to='/dashboard'>
					<img src={logo} alt='logo' />
				</NavLink>

				<ul>
					<li>
						<NavLink to={"/profile"}>
							<img src={user} alt='user' />
						</NavLink>
					</li>

					<li>
						<NavLink to='/friends'>
							<img src={cube} alt='cube' />
						</NavLink>
					</li>

					<li>
						<NavLink to='/dashboard'>
							<img src={dashboard} alt='dashboard' />
						</NavLink>
					</li>
					<li>
						<NavLink to='/dialogs'>
							<img src={wallet} alt='wallet' />
						</NavLink>
					</li>
					<li>
						<NavLink to='/users'>
							<img src={charts} alt='charts' />
						</NavLink>
					</li>
				</ul>
				<ul>
					<Login isAuth={isAuth} logout={logout} />
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
