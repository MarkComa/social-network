import React from "react";
import style from "./blocks/dialogs.module.css";
import FriendsContainer from "./componentConteiner/friendsContainer";

const Friends = () => {
  return (
    <section className={style.dialogs}>
      <h1 className={style.title}>Мои Друзья</h1>
      <div className={style.content}>
        <FriendsContainer />
      </div>
    </section>
  );
};

export default Friends;
