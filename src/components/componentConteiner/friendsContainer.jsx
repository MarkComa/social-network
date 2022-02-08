import React from "react";
import FriendsList from "../friendsList";
import { connect } from "react-redux";

class FriendsContainer extends React.Component {
  componentDidMount() {}
  render() {
    return <FriendsList />;
  }
}

export default connect(null, {})(FriendsContainer);
