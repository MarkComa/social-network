import React from "react";
import { connect } from "react-redux";
import { toggleIsFetching } from "../../redux/reducers/usersReducer";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
} from "../../redux/reducers/profileReducer";
import { Redirect } from "react-router-dom";
import Profile from "../profile";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.userIdMe;
    }
    this.props.getUserStatus(userId);
    this.props.getUserProfile(userId);
  }

  render() {
    if (!this.props.isAuth) return <Redirect to="/login" />;

    return (
      <>
        <Profile {...this.props} />;
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
  };
};

export default compose(
  connect(mapStateToProps, {
    toggleIsFetching,
    getUserProfile,
    getUserStatus,
    updateUserStatus,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
