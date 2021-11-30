import "./App.css";
import React from "react";
import NavbarСontainer from "./components/componentConteiner/navbarСontainer";
import DashboardContainer from "./components/componentConteiner/dashboardContainer";
import FriendsContainer from "./components/componentConteiner/friendsContainer";
import ChatContainer from "./components/componentConteiner/chatContainer";
import { Route } from "react-router-dom";
import UsersContainer from "./components/componentConteiner/usersContainer";
import ProfileContainer from "./components/componentConteiner/profileContainer";
import Auth from "./components/auth";
import { initializeApp } from "./redux/reducers/appReducer";
import { connect } from "react-redux";
import Preloader from "./components/preloader";
//12345
class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader isFetching="true" />;
    }

    return (
      <div className="dashboard">
        <NavbarСontainer />
        <Route path="/dialogs/:friendId?" render={() => <ChatContainer />} />
        <Route path="/friends" render={() => <FriendsContainer />} />
        <Route path="/dashboard" render={() => <DashboardContainer />} />
        <Route path="/users" render={() => <UsersContainer />} />
        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
        <Route path="/login" render={() => <Auth />} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isFetching: state.usersPage.isFetching,
});

export default connect(mapStateToProps, { initializeApp })(App);
