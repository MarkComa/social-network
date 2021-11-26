import react from "React";

class AboutMe extends React.Component {
  state = {
    aboutMe: this.props.aboutMe,
    editMode: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.aboutMe !== this.state.aboutMe) {
      setState({ aboutMe: this.props.aboutMe });
    }
  }
  onAboutMeChange = (e) => {
    this.setState({ status: e.currentTarget.value });
  };

  activateEditMode = () => {
    this.setState({ editMode: true });
  };

  deactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateAboutMe(this.state.status);
  };

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={activateEditMode}>{this.state.aboutMe}</span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <textarea autoFocus="true" onBlur={deactivateEditMode}></textarea>
          </div>
        )}
      </div>
    );
  }
}

export default AboutMe;
