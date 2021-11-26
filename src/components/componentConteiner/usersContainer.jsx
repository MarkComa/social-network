import React from "react";
import { connect } from "react-redux";
import {
  follow,
  unfollow,
  requestUsers,
  setCurrentPage,
} from "../../redux/reducers/usersReducer";
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from "../../redux/selects/user-selects";

import Users from "../users";
import Preloader from "../preloader";
import { compose } from "redux";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.pageSize, this.props.currentPage);
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.requestUsers(this.props.pageSize, pageNumber);
  };

  render() {
    return (
      <>
        <Preloader isFetching={this.props.isFetching} />
        <Users {...this.props} onPageChanged={this.onPageChanged} />;
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    requestUsers,
    setCurrentPage,
    follow,
    unfollow,
  })
)(UsersContainer);
