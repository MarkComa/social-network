import React from "react";
import style from "./blocks/profile.module.css";
import Preloader from "./preloader";
import ProfileStatus from "./profileStatus";

const Profile = (props) => {
  debugger;
  if (!props.profile) {
    return <Preloader isFetching={props.isFetching} />;
  }

  const contacts = props.profile.contacts;

  return (
    <div className={style.profile}>
      <div className={style.profile__user}>
        <img
          src={
            props.profile.photos.large === null
              ? "https://via.placeholder.com/300"
              : props.profile.photos.large
          }
          alt="avatar"
          className={style.avatar}
        />
        <div className={style.status}>
          <ProfileStatus
            status={props.status}
            updateUserStatus={props.updateUserStatus}
          />
        </div>
        <div className={style.contact}>
          <h1>Contacts</h1>
          <div>
            <p>{contacts.facebook !== null ? contacts.facebook : ""} </p>
            <p>{contacts.github !== null ? contacts.github : ""}</p>
            <p>{contacts.instagram !== null ? contacts.instagram : ""}</p>
            <p>{contacts.mainLink !== null ? contacts.mainLink : ""}</p>
            <p>{contacts.twitter !== null ? contacts.twitter : ""}</p>
            <p>{contacts.vk !== null ? contacts.vk : ""}</p>
            <p>{contacts.website !== null ? contacts.website : ""}</p>
            <p>{contacts.youtube !== null ? contacts.youtube : ""}</p>
          </div>
        </div>
        <div className={style.fName}>{props.profile.fullName}</div>
        <div className={style.job}>
          {props.profile.lookingForAJob ? "В поиске работы" : "Работа подождет"}
        </div>
        <div className={style.jobDescription}>
          {props.profile.lookingForAJobDescription}
        </div>
        <div className={style.aboutMe}>{props.profile.aboutMe}</div>
      </div>
    </div>
  );
};

export default Profile;
