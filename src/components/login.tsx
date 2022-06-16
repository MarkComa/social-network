import React, { MouseEventHandler } from "react";
import loginIcon from "../assets/images/login.svg";
import logoutIcon from "../assets/images/logout.svg";
import { useAppDispatch } from "../redux/hooks/hooks";
import { AppDispatch } from "../redux/redux-store";


type Props = {
	isAuth: boolean;
	login: string | null;
	logout: () => (dispatch: AppDispatch) => Promise<void>
};



export const Login = ({ isAuth, login, logout }: Props) => {
	const dispatch = useAppDispatch();
	const onLogout: MouseEventHandler<HTMLButtonElement> = () => {
		dispatch(logout())
	}
	return (
		<div>
			{isAuth ? (
				<button onClick={onLogout}>
					<img src={logoutIcon} alt={"Выход"} />
					<div>{login}</div>
				</button>
			) : (
				<button>
					<img src={loginIcon} alt={"Вход"} />
					<div>Вход</div>
				</button>
			)}
		</div>
	);
};
