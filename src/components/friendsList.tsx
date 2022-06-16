import React from "react";
import { useAppDispatch } from "../redux/hooks/hooks";
import style from "./blocks/dialogs.module.css";

type Props = {
	setUsers: () => void;
};
const FriendsList = ({ setUsers }: Props) => {
	const dispatch = useAppDispatch();
	return (
		<section className={style.dialogs}>
			<h1 className={style.title}>Мои Друзья</h1>
			<div className={style.content}></div>
			<button onClick={() => dispatch(setUsers)}>
				Set Users Followed
			</button>
		</section>
	);
};

export default FriendsList;
