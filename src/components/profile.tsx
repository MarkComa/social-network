import React, { ChangeEventHandler, useEffect } from "react";
import {
	getUserProfile,
	getUserStatus,
	saveAvatar,
	setEditMode,
	updateUserStatus,
} from "../redux/reducers/profileReducer";
import { useParams } from "react-router-dom";
import style from "./blocks/profile.module.css";
import Preloader from "./preloader";
import ProfileStatus from "./profileStatus";
import { ProfileData, ProfileDataForm } from "./profileData";
import { DownloadFileBtn } from "./DownloadFileBtn";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";

const Profile = () => {
	const profile = useAppSelector((state) => state.profilePage.profile);
	const isFetching = useAppSelector((state) => state.usersPage.isFetching);
	const status = useAppSelector((state) => state.profilePage.status);
	const userIdMe = useAppSelector((state) => state.auth.userId);
	const isEditMode = useAppSelector((state) => state.profilePage.isEditMode);
	const dispatch = useAppDispatch();
	let { userId } = useParams<{ userId: string }>();
	const isOwner = !userId;

	const refreshProfile = () => {
		if (!userId) {
			userId = userIdMe;
		}
		dispatch(getUserStatus(userId));
		dispatch(getUserProfile(userId));
	};
	useEffect(() => {
		refreshProfile();
	}, []);
	useEffect(() => {
		refreshProfile();
	}, [userId]);

	if (!profile) {
		return <Preloader isFetching={isFetching} />;
	}
	//-----проверить типизацию эвента
	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const input = e.target as HTMLInputElement;
		if (!input.files?.length) {
			return;
		}
		input.files.length && dispatch(saveAvatar(input.files[0]));
	};

	const onSetEditMode = () => {
		dispatch(setEditMode());
	};
	return (
		<div className={style.profile}>
			<div className={style.profile__user}>
				<div className={style.avatar}>
					<img
						src={
							profile.photos.large === null
								? "https://via.placeholder.com/300"
								: profile.photos.large
						}
						alt='avatar'
					/>
					{isOwner && isEditMode && (
						<DownloadFileBtn onChange={onChange} />
					)}
				</div>
				<div className={style.status}>
					<ProfileStatus
						status={status}
					/>
				</div>
				{isOwner && (
					<button onClick={onSetEditMode} className={style.btn}>
						{!isEditMode ? "Редактировать" : "Закрыть"}
					</button>
				)}
				{!isEditMode ? (
					<div className={style.profileData}>
						<ProfileData profile={profile} />
					</div>
				) : (
					<ProfileDataForm profile={profile} />
				)}
			</div>
		</div>
	);
};

export default Profile;