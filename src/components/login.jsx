import React from "react";

import login from "../assets/images/login.svg";
import logout1 from "../assets/images/logout.svg";
import { connect } from "react-redux";
import { logout } from "../redux/reducers/authReducer";

const Login = (props) => {
  return (
    <div>
      {props.isAuth ? (
        <button onClick={props.logout}>
          <img src={logout1} alt={"Выход"} />
          <div>{props.login}</div>
        </button>
      ) : (
        <button>
          <img src={login} alt={"Вход"} />
          <div>Вход</div>
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { logout })(Login);
