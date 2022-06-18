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
			{errors.email && <div>??</div>}
			<div> Логин</div>
			<input
				{...register("email", { required: true })}
				type={"text"}
			/>
			<div>Пароль</div>
			<input
				{...register("password", { required: true })}
				type={"password"}
			/>
			<input {...register("rememberMe")} type={"checkbox"} />
			remember me
			{captchaUrl && (
				<>
					<img src={captchaUrl} alt='captcha' />
					<input
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
		<div>
			<AuthForm captchaUrl={captchaUrl} />
		</div>
	);
};

