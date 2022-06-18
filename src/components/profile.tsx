import { ChangeEventHandler, useEffect } from "react";
import {
	actionsProfile,
	getUserProfile,
	getUserStatus,
	saveAvatar,
} from "../redux/reducers/profileReducer";
import { Redirect, useParams } from "react-router-dom";
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
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const dispatch = useAppDispatch();
	let { userId } = useParams<{ userId: string }>();
	const isOwner = !userId;

	const refreshProfile = () => {
		if (!userId) {
			dispatch(getUserStatus(userIdMe));
			dispatch(getUserProfile(userIdMe));
		}
		dispatch(getUserStatus(userId));
		dispatch(getUserProfile(userId));
	};

	useEffect(() => {
		refreshProfile();
	}, []);
	useEffect(() => {
		refreshProfile();
		userId && dispatch(actionsProfile.setEditMode(false));
	}, [userId]);

	if (!profile) {
		return <Preloader isFetching={isFetching} />;
	}
	if (!isAuth) {
		return <Redirect to='/login' />;
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
		dispatch(actionsProfile.setEditMode(!isEditMode));
	};
	return (
		<div>
			<div>
				<div>
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
				<div>
					<ProfileStatus status={status} isOwner={isOwner} />
				</div>
				{isOwner && (
					<button onClick={onSetEditMode}>
						{!isEditMode ? "Редактировать" : "Закрыть"}
					</button>
				)}
				{!isEditMode ? (
					<div>
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
