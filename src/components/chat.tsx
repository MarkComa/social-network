import React from "react";
import style from "./blocks/dialogs.module.css";
import { sendMessageClick } from "../redux/reducers/dialogReducer";
import Messanger from "./messager";
import { useAppSelector } from "../redux/hooks/hooks";
import { Link, useParams } from "react-router-dom";

const Chat = () => {
	const friends = useAppSelector((state) => state.dialogPage.friends);

	let {friendId} = useParams<{friendId: string}>();

	if (!friendId) {
		friendId = "";
	}

	const dialogItemEl = friends.map((dI) => {
		return <DialogItem fname={dI.fName} id={dI.id} />;
	});

	const friend = friends.filter((i) => {
		return i.id === friendId;
	});

	return (
		<section className={style.dialogs}>
			<h1 className={style.title}>Диалоги</h1>
			<div className={style.content}>
				<ul className={style.list}>{dialogItemEl}</ul>
				<Messanger
					friend={friend}
					friendId={friendId}
				/>
			</div>
		</section>
	);
};
export default Chat
// написать тип ->
const DialogItem = (props:any) => { 
  return (
    <li className={style.list__item}>
      <Link
        to={`/dialogs/` + props.id}
        className={style.list__item__link}>
        {props.name} {props.fname}
      </Link>
    </li>
  );
};
