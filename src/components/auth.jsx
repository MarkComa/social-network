import React from "react";
import { Field, reduxForm } from "redux-form";
import style from "./blocks/auth.module.css";
import fcStyle from "./blocks/formsControls.module.css";
import { required } from "../utils/validators/validators";
import { Input } from "./formControls/formsControls";
import { connect } from "react-redux";
import { login } from "../redux/reducers/authReducer";
import { Redirect } from "react-router-dom";

const AuthForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {props.error && (
        <div className={fcStyle.formSummaryError}>{props.error}</div>
      )}
      <div className={style.title}>Логин</div>
      <Field
        className={style.loginInput}
        placeholder={"Введите логин"}
        name={"email"}
        component={Input}
        validate={[required]}
      />
      <div className={style.title}>Пароль</div>
      <Field
        className={style.passwordInput}
        placeholder={"Введите пароль"}
        type={"password"}
        name={"password"}
        component={Input}
        validate={[required]}
      />
      <Field type={"checkbox"} component={"input"} name={"rememberMe"} />
      remember me
      <div>
        <button className={style.btn}>Вход</button>
        <button className={style.btn}>Регистрация</button>
      </div>
    </form>
  );
};

const AuthReduxForm = reduxForm({ form: "login" })(AuthForm);
const Auth = (props) => {
  let onSubmitAuth = (values) => {
    props.login(values.email, values.password, values.rememberMe);
  };
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className={style.auth}>
      <AuthReduxForm onSubmit={onSubmitAuth} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Auth);