import React from "react";
import style from "./blocks/users.module.css";
import Pagination from "./common/pagginator";
import UserCard from "./userCard";

const Users = (props) => {
  return (
    <div className={style.users__page}>
      <Pagination
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
      />
      <div className={style.users}>
        {props.users.map((u) => (
          <div key={u.id}>
            <UserCard
              id={u.id}
              name={u.name}
              photos={u.photos.small}
              status={u.status}
              {...props}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
