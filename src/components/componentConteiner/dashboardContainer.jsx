import React from "react";
import { connect } from "react-redux";
import Dashboard from "../dashboard";

class DashboardContainer extends React.Component {
  componentDidMount() {}
  render() {
    return <Dashboard />;
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(DashboardContainer);
