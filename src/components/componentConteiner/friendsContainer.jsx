import FriendsList from "../friendsList";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  
  return {
    friends: state.friendsPage.friends,
  };
};

const FriendsContainer = connect(mapStateToProps)(FriendsList);

export default FriendsContainer;
