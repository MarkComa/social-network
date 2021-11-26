import React from "react";
//import style from "./blocks/profile.module.css";

class Status extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  onStatusChange = (e) => {
    this.setState({ status: e.currentTarget.value });
  };

  activateEditMode = () => {
    this.setState({ editMode: true });
  };

  deactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateUserStatus(this.state.status);
  };

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status
                ? this.state.status
                : "Здесь мог быть ваш статус"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              value={this.state.status}
              onBlur={this.deactivateEditMode}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Status;
