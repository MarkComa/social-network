import React from "react";
import { connect } from "react-redux";
import Navbar from "../navbar";
import { getAuth } from "../../redux/reducers/authReducer";

class NavbarContainer extends React.Component {
  render() {
    return <Navbar {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userIdMe: state.auth.userId,
});

export default connect(mapStateToProps, { getAuth })(NavbarContainer);
