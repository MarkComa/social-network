import React from "react";
import style from "./blocks/dialogs.module.css";
const FriendsList = (props) => {
  return (
    <section className={style.dialogs}>
      <h1 className={style.title}>Мои Друзья</h1>
      <div className={style.content}></div>
      <button onClick={props.setUsers}>Set Users Followed</button>
    </section>
  );
};

export default FriendsList;
