import style from "./blocks/auth.module.css";
import fcStyle from "./blocks/formsControls.module.css";
import { login } from "../redux/reducers/authReducer";
import { Redirect } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";

type AuthFormProps = {
	captchaUrl: string | null;
};
type AuthFormData = {
	email: string;
	password: string;
	rememberMe: boolean;
	captcha: string | null;
};
const AuthForm = ({ captchaUrl }: AuthFormProps) => {
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthFormData>();

	const onSubmit: SubmitHandler<AuthFormData> = (data) => {
		const { email, password, rememberMe, captcha } = data;
		dispatch(login(email, password, rememberMe, captcha));
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{errors.email && <div className={fcStyle.formSummaryError}>??</div>}
			<div className={style.title}>Логин</div>
			<input
				className={style.loginInput}
				{...register("email", { required: true })}
				type={"text"}
			/>
			<div className={style.title}>Пароль</div>
			<input
				className={style.passwordInput}
				{...register("password", { required: true })}
				type={"password"}
			/>
			<input {...register("rememberMe")} type={"checkbox"} />
			remember me
			{captchaUrl && (
				<>
					<img src={captchaUrl} alt='captcha' />
					<input
						className={style.loginInput}
						{...register("captcha", { required: true })}
						type='text'
						placeholder={"Введите каптчу"}
					/>
				</>
			)}
			<input type={"submit"} value={"Вход"} />
		</form>
	);
};

export const Auth = () => {
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const captchaUrl = useAppSelector(state => state.auth.captchaUrl)
	if (isAuth) {
		return <Redirect to='/profile' />;
	}

	return (
		<div className={style.auth}>
			<AuthForm captchaUrl={captchaUrl} />
		</div>
	);
};

