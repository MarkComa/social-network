import React from "react";
import { connect } from "react-redux";
import { toggleIsFetching } from "../../redux/reducers/usersReducer";
import {
	getUserProfile,
	getUserStatus,
	updateUserStatus,
	saveAvatar,
	setEditMode
} from "../../redux/reducers/profileReducer";
import { Redirect } from "react-router-dom";
import Profile from "../profile";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";

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
				<Profile isOwner={!this.props.match.params.userId} {...this.props} />;
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
		editMode: state.profilePage.editMode
	};
};

export default compose(
	connect(mapStateToProps, {
		toggleIsFetching,
		getUserProfile,
		getUserStatus,
		updateUserStatus,
		saveAvatar,
		setEditMode
	}),
	withRouter,
	withAuthRedirect,
)(ProfileContainer);
