import React from "react";
import style from "./blocks/dialogs.module.css";
import { NavLink } from "react-router-dom";
import Messanger from "./messanger";

const DialogItem = (props) => {
  return (
    <li className={style.list__item}>
      <NavLink to={`/dialogs/` + props.id} className={style.list__item__link}>
        {props.name} {props.fname}
      </NavLink>
    </li>
  );
};

const Chat = (props) => {
  const dialogItemEl = props.friends.map((dI) => {
    return <DialogItem fname={dI.fName} id={dI.id} />;
  });

  const friend = props.friends.filter((i) => {
    return i.id === props.friendId;
  });
  return (
    <>
      <ul className={style.list}>{dialogItemEl}</ul>

      <Messanger
        sendMessageClick={props.sendMessageClick}
        newMessageChange={props.newMessage}
        newMessageText={props.newMessageText}
        friend={friend}
        friendId={props.friendId}
      />
    </>
  );
};

export default Chat;
