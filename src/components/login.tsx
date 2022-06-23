import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks/hooks";
import { AppDispatch } from "../redux/redux-store";


type Props = {
	isAuth: boolean;
	logout: () => (dispatch: AppDispatch) => Promise<void>
};



export const Login = ({ isAuth, logout }: Props) => {
	const dispatch = useAppDispatch();
	const onLogout: MouseEventHandler<HTMLButtonElement> = () => {
		dispatch(logout())
	}
	return (
		<div>
			{isAuth ? (
				<button onClick={onLogout}>
					<div>Выход</div>
				</button>
			) : (
				<button>
					<Link to='/login'>Вход</Link>
				</button>
			)}
		</div>
	);
};
