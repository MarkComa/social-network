import React from "react";
import { connect } from "react-redux";
import { toggleIsFetching } from "../../redux/reducers/usersReducer";
import {
	getUserProfile,
	getUserStatus,
	updateUserStatus,
	saveAvatar,
	setEditMode,
	updateUserProfile,
} from "../../redux/reducers/profileReducer";
import { Redirect } from "react-router-dom";
import Profile from "../profile";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";
import style from "../blocks/profile.module.css";
import Preloader from "../preloader";
import ProfileStatus from "../profileStatus";
import { ProfileData, ProfileDataForm } from "../profileData";
import { DownloadFileBtn } from "../DownloadFileBtn";

class ProfileContainer extends React.Component {
	refreshProfile() {
		let userId = this.props.match.params.userId;
		if (!userId) {
			userId = this.props.userIdMe;
		}
		this.props.getUserStatus(userId);
		this.props.getUserProfile(userId);
	}
	componentDidMount() {
		this.refreshProfile();
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.userId !== prevProps.match.params.userId)
			this.refreshProfile();
	}

	render() {
		if (!this.props.isAuth) return <Redirect to='/login' />;

		return (
			<>
				<Profile
					isOwner={!this.props.match.params.userId}
					{...this.props}
				/>
				;
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.profilePage.profile,
		isFetching: state.usersPage.isFetching,
		status: state.profilePage.status,
		userIdMe: state.auth.userId,
		isEditMode: state.profilePage.isEditMode,
	};
};

export default compose(
	connect(mapStateToProps, {
		toggleIsFetching,
		getUserProfile,
		getUserStatus,
		updateUserStatus,
		saveAvatar,
		setEditMode,
		updateUserProfile,
	}),
	withRouter,
	withAuthRedirect,
)(ProfileContainer);
//------------Переписываем на функциональный компонент с хуками----------------------------------
export const Profile1 = (props) => {
	if (!props.profile) {
		return <Preloader isFetching={props.isFetching} />;
	}
	const onChange = (e) => {
		e.target.files.length && props.saveAvatar(e.target.files[0]);
	};

	const onSetEditMode = () => {
		props.setEditMode();
	};
	return (
		<div className={style.profile}>
			<div className={style.profile__user}>
				<div className={style.avatar}>
					<img
						src={
							props.profile.photos.large === null
								? "https://via.placeholder.com/300"
								: props.profile.photos.large
						}
						alt='avatar'
					/>
					{props.isOwner && props.isEditMode && (
						<DownloadFileBtn onChange={onChange} />
					)}
				</div>
				<div className={style.status}>
					<ProfileStatus
						status={props.status}
						updateUserStatus={props.updateUserStatus}
					/>
				</div>
				{props.isOwner && (
					<button onClick={onSetEditMode} className={style.btn}>
						{!props.isEditMode ? "Редактировать" : "Закрыть"}
					</button>
				)}
				{!props.isEditMode ? (
					<div className={style.profileData}>
						<ProfileData profile={props.profile} />
					</div>
				) : (
					<ProfileDataForm
						profile={props.profile}
						updateUserProfile={props.updateUserProfile}
					/>
				)}
			</div>
		</div>
	);
};
