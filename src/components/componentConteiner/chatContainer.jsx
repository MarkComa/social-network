import React from "react";
import style from "../blocks/dialogs.module.css";

import { connect } from "react-redux";
import { sendMessageClick } from "../../redux/reducers/dialogReducer";
import { withRouter } from "react-router-dom";
import Chat from "../chat";

class ChatContainer extends React.Component {
  render() {
    let friendId = this.props.match.params.friendId;
    if (!friendId) {
      friendId = "";
    }

    return (
      <section className={style.dialogs}>
        <h1 className={style.title}>Диалоги</h1>
        <div className={style.content}>
          <Chat {...this.props} friendId={friendId} />;
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.dialogPage.friends,
  };
};

export default connect(mapStateToProps, { sendMessageClick })(
  withRouter(ChatContainer)
);
