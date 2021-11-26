import React from "react";
import Friend from "./friend";

const FriendsList = (props) => {
    let friendEl = props.friends.map((f) => {

    return <Friend key={f.id} name={f.name} fname={f.fname} avatar={f.avatar} id={f.id} />;
  });

  return (
    <section className="friends">

      <div className="friendsList">{friendEl}</div>
    </section>
  );
};

export default FriendsList;
