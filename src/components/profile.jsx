import React from "react";
import style from "./blocks/profile.module.css";
import Preloader from "./preloader";
import ProfileStatus from "./profileStatus";
import { ProfileData, ProfileDataForm } from "./profileData";

const Profile = (props) => {
	if (!props.profile) {
		return <Preloader isFetching={props.isFetching} />;
	}


	const onChange = (e) => {
		e.target.files.length && props.saveAvatar(e.target.files[0]);
	};

  const onSetEditMode = () => {
    props.setEditMode()
  }
	return (
		<div className={style.profile}>
			<div className={style.profile__user}>
				<img
					src={
						props.profile.photos.large === null
							? "https://via.placeholder.com/300"
							: props.profile.photos.large
					}
					alt='avatar'
					className={style.avatar}
				/>
				{props.isOwner && props.isEditMode && <input type='file' onChange={onChange} />}
				<div className={style.status}>
					<ProfileStatus
						status={props.status}
						updateUserStatus={props.updateUserStatus}
					/>
				</div>
        { props.isOwner && <button onClick={onSetEditMode}>{!props.isEditMode ? "Редактировать" : "Закрыть"}</button>}
				{!props.isEditMode ? <ProfileData profile={props.profile} /> : <ProfileDataForm profile={props.profile} updateUserProfile={props.updateUserProfile}/>}
			</div>
		</div>
	);
};


export default Profile;
