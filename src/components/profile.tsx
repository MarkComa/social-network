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
import { Col, Row, Typography, Image, Affix } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Profile = () => {
	const profile = useAppSelector((state) => state.profilePage.profile);
	const isFetching = useAppSelector((state) => state.users.isFetching);
	const status = useAppSelector((state) => state.profilePage.status);
	const userIdMe = useAppSelector((state) => state.auth.userId);
	const isEditMode = useAppSelector((state) => state.profilePage.isEditMode);
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const dispatch = useAppDispatch();
	let { userId } = useParams<{ userId: string }>();
	const isOwner = !userId;

	const getUsersProfile = (id: string | null) => {
		dispatch(getUserStatus(id));
		dispatch(getUserProfile(id));
	}
	const refreshProfile = () => {
		if (!userId) {
			getUsersProfile(userIdMe)
		}
		getUsersProfile(userId)
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
	const { Title } = Typography;
	return (
		<div>
			<Title>Профиль</Title>
			<Row>
				<Col md={10} sm={24}>
					<Image
						preview={true}
						src={
							profile.photos.large === null
								? "https://via.placeholder.com/300"
								: profile.photos.large
						}
						width={200}
					/>
					{isOwner && isEditMode && (
						<DownloadFileBtn onChange={onChange} />
					)}
				</Col>
				<Col md={14} sm={24}>
					<Row>
						<Col span={24}>
							<ProfileStatus status={status} isOwner={isOwner} />
						</Col>
						<Col>
							{!isEditMode ? (
								<ProfileData profile={profile} />
							) : (
								<ProfileDataForm profile={profile} />
							)}
						</Col>
					</Row>
				</Col>
				<Col>
					<Affix
						style={{
							position: "fixed",
							top: "90px",
							right: "30px",
						}}>
						{isOwner && (
							<button onClick={onSetEditMode}>
								<span className='editProfile'>
									{!isEditMode ? "Редактировать" : "Закрыть"}
								</span>
								<span className='editIcon'><EditOutlined style={{ fontSize: '30px'}} /></span>
							</button>
						)}
					</Affix>
				</Col>
			</Row>
		</div>
	);
};

export default Profile;
